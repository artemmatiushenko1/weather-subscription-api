import { SubscriptionTokenScope } from './subscription-token-scope';

class SubscriptionToken {
  id: string;
  token: string;
  expiresAt: Date;
  scope: SubscriptionTokenScope;
  subscriptionId: string;
}

export { SubscriptionToken };
