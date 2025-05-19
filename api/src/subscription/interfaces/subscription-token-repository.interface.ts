import { SubscriptionToken } from '../domain/subscription-token';

export const SUBSCRIPTION_TOKEN_REPOSITORY_TOKEN = Symbol(
  'SUBSCRIPTION_TOKEN_REPOSITORY',
);
interface ISubscriptionTokenRepository {
  find: (token: string) => Promise<SubscriptionToken | null>;
  findUnsubscribeToken: (
    subscriptionId: string,
  ) => Promise<SubscriptionToken | null>;
  create: (
    subscriptionId: string,
    subscriptionToken: SubscriptionToken,
  ) => Promise<SubscriptionToken>;
  delete: (tokenId: string) => Promise<boolean>;
}

export { ISubscriptionTokenRepository };
