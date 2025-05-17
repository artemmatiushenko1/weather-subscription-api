import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Frequency } from './domain/frequency';
import {
  ISubscriptionRepository,
  SUBSCRIPTION_REPOSITORY_TOKEN,
} from './interfaces/subscription-repository.interface';
import { Subscription } from './domain/subscription';
import {
  ISubscriptionTokenRepository,
  SUBSCRIPTION_TOKEN_REPOSITORY_TOKEN,
} from './interfaces/subscription-token-repository.interface';
import * as dayjs from 'dayjs';
import { SubscriptionToken } from './domain/subscription-token';
import { SubscriptionTokenScope } from './domain/subscription-token-scope';
import * as crypto from 'node:crypto';
import { EmailAlreadySubscribedException } from './exceptions/email-already-subscribed.exception';
import { EmailService } from 'src/email/email.service';

const SUBSCRIPTION_CONFIRMATION_TOKEN_VALIDITY_DAYS = 7;

// TODO: create subscription tokens manager
@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY_TOKEN)
    private readonly subscriptionRepository: ISubscriptionRepository,
    @Inject(SUBSCRIPTION_TOKEN_REPOSITORY_TOKEN)
    private readonly subscriptionTokenRepository: ISubscriptionTokenRepository,
    private readonly emailService: EmailService,
  ) {}

  private async createSubscriptionToken(
    subscriptionId: string,
    scope: SubscriptionTokenScope,
    expiresAt: Date | null,
  ): Promise<SubscriptionToken> {
    const tokenToCreate = new SubscriptionToken();
    tokenToCreate.expiresAt = expiresAt;
    tokenToCreate.scope = scope;
    tokenToCreate.token = crypto.randomBytes(32).toString('hex');

    const createdToken = await this.subscriptionTokenRepository.create(
      subscriptionId,
      tokenToCreate,
    );

    return createdToken;
  }

  async subscribe(email: string, city: string, frequency: Frequency) {
    const subscriptionToCreate = new Subscription();
    subscriptionToCreate.city = city.trim().toLowerCase(); // TODO: can transform be moved to dto?
    subscriptionToCreate.frequency = frequency;
    subscriptionToCreate.email = email.trim().toLowerCase();

    const existingSubscription =
      await this.subscriptionRepository.get(subscriptionToCreate);

    if (existingSubscription) {
      if (existingSubscription.confirmed) {
        throw new EmailAlreadySubscribedException();
      } else {
        // TODO: invalidate confirmation token if subscription is not confirmed
        return;
      }
    }

    const createdSubscription =
      await this.subscriptionRepository.create(subscriptionToCreate);

    const confirmationToken = await this.createSubscriptionToken(
      createdSubscription.id,
      SubscriptionTokenScope.CONFIRM,
      dayjs()
        .add(SUBSCRIPTION_CONFIRMATION_TOKEN_VALIDITY_DAYS, 'day')
        .toDate(),
    );

    await this.emailService.sendSubscriptionConfirmationEmail(
      email,
      frequency,
      city,
      // TODO: build url depending on env
      `http://localhost:3000/confirm/${confirmationToken.token}`,
    );
  }

  private async validateToken(
    token: string,
    expectedScope: SubscriptionTokenScope,
  ): Promise<SubscriptionToken> {
    const foundToken = await this.subscriptionTokenRepository.find(token);

    if (!foundToken) {
      throw new NotFoundException('Token not found');
    }

    const isTokenExpired = dayjs(foundToken.expiresAt).isBefore(dayjs());

    if (foundToken.scope !== expectedScope || isTokenExpired) {
      throw new BadRequestException('Invalid token');
    }

    return foundToken;
  }

  async confirm(token: string) {
    const validatedToken = await this.validateToken(
      token,
      SubscriptionTokenScope.CONFIRM,
    );
    // TODO: should a single transaction? https://github.com/brocoders/nestjs-boilerplate/issues/1892
    await this.subscriptionTokenRepository.delete(validatedToken.id);
    await this.subscriptionRepository.confirm(validatedToken.subscriptionId);
    await this.createSubscriptionToken(
      validatedToken.subscriptionId,
      SubscriptionTokenScope.UNSUBSCRIBE,
      null,
    );
    // TODO: redirect to page on frontend
  }

  async unsubscribe(token: string) {
    const validatedToken = await this.validateToken(
      token,
      SubscriptionTokenScope.UNSUBSCRIBE,
    );
    // TODO: should a single transaction?
    await this.subscriptionTokenRepository.delete(validatedToken.id);
    await this.subscriptionRepository.delete(validatedToken.subscriptionId);
  }
}
