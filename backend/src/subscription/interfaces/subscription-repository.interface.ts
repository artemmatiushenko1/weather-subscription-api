import { Subscription } from '../domain/subscription';

interface ISubscriptionRepository {
  getByEmail: (email: string) => Promise<Subscription | null>;
  create: (subscription: Subscription) => Promise<Subscription>;
  confirm: (subscriptionId: string) => Promise<undefined>;
  delete: (subscriptionId: string) => Promise<boolean>;
}

export { ISubscriptionRepository };
