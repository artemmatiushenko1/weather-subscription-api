import { SubscriptionTokenScope } from './subscription-token-scope';

class SubscriptionToken {
  token: string;
  expiresAt: Date;
  scope: SubscriptionTokenScope;
}

export { SubscriptionToken };
