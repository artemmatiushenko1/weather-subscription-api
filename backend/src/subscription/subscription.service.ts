import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { EmailAlreadySubscribedException } from './exceptions/email-already-subscribed.exception';
import { EmailService } from 'src/email/email.service';
import { AppConfigService } from 'src/app-config/app-config.service';
import { SubscriptionTokenManager } from './subscription-token-manager';

const SUBSCRIPTION_CONFIRMATION_TOKEN_VALIDITY_DAYS = 7;

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY_TOKEN)
    private readonly subscriptionRepository: ISubscriptionRepository,
    @Inject(SUBSCRIPTION_TOKEN_REPOSITORY_TOKEN)
    private readonly subscriptionTokenRepository: ISubscriptionTokenRepository,
    private readonly emailService: EmailService,
    private readonly appConfigService: AppConfigService,
    private readonly tokenManager: SubscriptionTokenManager,
  ) {}

  private buildConfirmationLink(token: string): string {
    return `${this.appConfigService.appConfig.host}/confirm/${token}`;
  }

  async subscribe(email: string, city: string, frequency: Frequency) {
    const subscriptionToCreate = new Subscription();
    subscriptionToCreate.city = city;
    subscriptionToCreate.frequency = frequency;
    subscriptionToCreate.email = email;

    const existingSubscription =
      await this.subscriptionRepository.get(subscriptionToCreate);

    if (existingSubscription) {
      if (existingSubscription.confirmed) {
        throw new EmailAlreadySubscribedException();
      } else {
        // TODO: resend confirmation email!
        return;
      }
    }

    const createdSubscription =
      await this.subscriptionRepository.create(subscriptionToCreate);

    const confirmationToken = await this.tokenManager.issue(
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
      this.buildConfirmationLink(confirmationToken.token),
    );
  }

  async confirm(token: string) {
    const validatedToken = await this.tokenManager.validate(
      token,
      SubscriptionTokenScope.CONFIRM,
    );
    // TODO: should a single transaction? https://github.com/brocoders/nestjs-boilerplate/issues/1892
    await this.tokenManager.invalidate(validatedToken.id);
    await this.subscriptionRepository.confirm(validatedToken.subscriptionId);
    await this.tokenManager.issue(
      validatedToken.subscriptionId,
      SubscriptionTokenScope.UNSUBSCRIBE,
      null,
    );
    // TODO: redirect to page on frontend
  }

  async unsubscribe(token: string) {
    const validatedToken = await this.tokenManager.validate(
      token,
      SubscriptionTokenScope.UNSUBSCRIBE,
    );
    // TODO: should a single transaction?
    await this.tokenManager.invalidate(validatedToken.id);
    await this.subscriptionRepository.delete(validatedToken.subscriptionId);
  }

  async getSubscriptionsByFrequency(
    frequency: Frequency,
  ): Promise<Subscription[]> {
    return this.subscriptionRepository.getAllByFrequency(frequency);
  }

  async getUnsubscribeToken(
    subscriptionId: string,
  ): Promise<SubscriptionToken> {
    const token =
      await this.subscriptionTokenRepository.findUnsubscribeToken(
        subscriptionId,
      );

    if (!token) {
      throw new NotFoundException(
        `Unsubscribe token was not found for subscription ${subscriptionId}`,
      );
    }

    return token;
  }
}
