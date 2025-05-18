import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubscriptionTokenScope } from './domain/subscription-token-scope';
import { SubscriptionToken } from './domain/subscription-token';
import * as crypto from 'node:crypto';
import {
  ISubscriptionTokenRepository,
  SUBSCRIPTION_TOKEN_REPOSITORY_TOKEN,
} from './interfaces/subscription-token-repository.interface';
import * as dayjs from 'dayjs';

@Injectable()
class SubscriptionTokenManager {
  constructor(
    @Inject(SUBSCRIPTION_TOKEN_REPOSITORY_TOKEN)
    private readonly subscriptionTokenRepository: ISubscriptionTokenRepository,
  ) {}

  async validate(
    token: string,
    expectedScope: SubscriptionTokenScope,
  ): Promise<SubscriptionToken> {
    const foundToken = await this.subscriptionTokenRepository.find(token);

    if (!foundToken) {
      throw new NotFoundException('Token not found');
    }

    const isTokenExpired = dayjs(foundToken.expiresAt).isBefore(dayjs());

    if (foundToken.scope !== expectedScope || isTokenExpired) {
      throw new BadRequestException('Invalid token');
    }

    return foundToken;
  }

  async issue(
    subscriptionId: string,
    scope: SubscriptionTokenScope,
    expiresAt: Date | null,
  ) {
    const tokenToCreate = new SubscriptionToken();
    tokenToCreate.expiresAt = expiresAt;
    tokenToCreate.scope = scope;
    tokenToCreate.token = crypto.randomBytes(32).toString('hex');

    const createdToken = await this.subscriptionTokenRepository.create(
      subscriptionId,
      tokenToCreate,
    );

    return createdToken;
  }

  async invalidate(tokenId: string) {
    return this.subscriptionTokenRepository.delete(tokenId);
  }
}

export { SubscriptionTokenManager };
