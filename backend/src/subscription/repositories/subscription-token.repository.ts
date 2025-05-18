import { Repository } from 'typeorm';
import { SubscriptionToken } from '../domain/subscription-token';
import { ISubscriptionTokenRepository } from '../interfaces/subscription-token-repository.interface';
import { SubscriptionTokenEntity } from '../entities/subscription-token.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../entities/subscription.entity';
import { SubscriptionTokenScope } from '../domain/subscription-token-scope';

@Injectable()
class SubscriptionTokenRepository implements ISubscriptionTokenRepository {
  constructor(
    @InjectRepository(SubscriptionTokenEntity)
    private readonly subscriptionTokenRepository: Repository<SubscriptionTokenEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  private toDomain(entity: SubscriptionTokenEntity): SubscriptionToken {
    const domainEntity = new SubscriptionToken();
    domainEntity.expiresAt = entity.expiresAt;
    domainEntity.scope = entity.scope;
    domainEntity.token = entity.token;
    domainEntity.subscriptionId = entity.subscription.id;
    domainEntity.id = entity.id;

    return domainEntity;
  }

  find = async (token: string): Promise<SubscriptionToken | null> => {
    const entity = await this.subscriptionTokenRepository.findOne({
      where: { token },
      relations: ['subscription'],
    });

    if (!entity) {
      return null;
    }

    return this.toDomain(entity);
  };

  create = async (
    subscriptionId: string,
    subscriptionToken: SubscriptionToken,
  ): Promise<SubscriptionToken> => {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
    });

    // TODO: create entity not found exception
    if (!subscription) {
      throw new Error(`Subscription with ID ${subscriptionId} not found`);
    }

    const entity = this.subscriptionTokenRepository.create({
      token: subscriptionToken.token,
      expiresAt: subscriptionToken.expiresAt,
      scope: subscriptionToken.scope,
      subscription,
    });

    const savedEntity = await this.subscriptionTokenRepository.save(entity);
    return this.toDomain(savedEntity);
  };

  delete = async (tokenId: string) => {
    const result = await this.subscriptionTokenRepository.delete(tokenId);
    return !!result.affected;
  };

  findUnsubscribeToken = async (
    subscriptionId: string,
  ): Promise<SubscriptionToken | null> => {
    const entity = await this.subscriptionTokenRepository.findOne({
      where: {
        subscription: { id: subscriptionId },
        scope: SubscriptionTokenScope.UNSUBSCRIBE,
      },
      relations: ['subscription'],
    });

    if (!entity) {
      return null;
    }

    return this.toDomain(entity);
  };
}

export { SubscriptionTokenRepository };
