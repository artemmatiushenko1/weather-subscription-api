import { Inject, Injectable } from '@nestjs/common';
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

// TODO: create subscription tokens manager
@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY_TOKEN)
    private readonly subscriptionRepository: ISubscriptionRepository,
    @Inject(SUBSCRIPTION_TOKEN_REPOSITORY_TOKEN)
    private readonly subscriptionTokenRepository: ISubscriptionTokenRepository,
  ) {}

  async subscribe(email: string, city: string, frequency: Frequency) {
    const subscriptionToCreate = new Subscription();
    subscriptionToCreate.city = city;
    subscriptionToCreate.frequency = frequency;
    subscriptionToCreate.email = email;

    const createdSubscription =
      await this.subscriptionRepository.create(subscriptionToCreate);

    const confirmationTokenToCreate = new SubscriptionToken();
    confirmationTokenToCreate.expiresAt = dayjs().add(7, 'day').toDate();
    confirmationTokenToCreate.scope = SubscriptionTokenScope.CONFIRM;
    confirmationTokenToCreate.token = crypto.randomBytes(32).toString('hex');

    const createdToken = await this.subscriptionTokenRepository.create(
      createdSubscription.id,
      confirmationTokenToCreate,
    );

    // TODO: send email
    console.log(`Please confirm you email. Token ${createdToken.token}`);
  }
}
