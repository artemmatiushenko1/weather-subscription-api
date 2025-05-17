import { SubscriptionTokenScope } from './subscription-token-scope';

class SubscriptionToken {
  id: string;
  token: string;
  expiresAt: Date | null;
  scope: SubscriptionTokenScope;
  subscriptionId: string;
}

export { SubscriptionToken };
