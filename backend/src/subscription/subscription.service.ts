import { Injectable } from '@nestjs/common';
import { Frequency } from './domain/frequency';

@Injectable()
export class SubscriptionService {
  async subscribe(email: string, city: string, frequency: Frequency) {
    console.log(email, city, frequency);
    return new Promise<string>((r) => r('a'));
  }
}
