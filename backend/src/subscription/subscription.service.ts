import { Inject, Injectable } from '@nestjs/common';
import { Frequency } from './domain/frequency';
import {
  ISubscriptionRepository,
  SUBSCRIPTION_REPOSITORY_TOKEN,
} from './interfaces/subscription-repository.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SUBSCRIPTION_REPOSITORY_TOKEN)
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {}

  async subscribe(email: string, city: string, frequency: Frequency) {
    console.log(email, city, frequency);
    return new Promise<string>((r) => r('a'));
  }
}
