import { Frequency } from '../domain/frequency';
import { Subscription } from '../domain/subscription';

export const SUBSCRIPTION_REPOSITORY_TOKEN = Symbol('SUBSCRIPTION_REPOSITORY');
export interface ISubscriptionRepository {
  get: (subscription: Subscription) => Promise<Subscription | null>;
  create: (subscription: Subscription) => Promise<Subscription>;
  confirm: (subscriptionId: string) => Promise<undefined>;
  delete: (subscriptionId: string) => Promise<boolean>;
  getAllByFrequency: (frequency: Frequency) => Promise<Subscription[]>;
}
