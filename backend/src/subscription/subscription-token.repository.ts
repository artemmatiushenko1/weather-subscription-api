import { Repository } from 'typeorm';
import { SubscriptionToken } from './domain/subscription-token';
import { ISubscriptionTokenRepository } from './interfaces/subscription-token-repository.interface';
import { SubscriptionTokenEntity } from './entities/subscription-token.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
class SubscriptionTokenRepository implements ISubscriptionTokenRepository {
  constructor(
    @InjectRepository(SubscriptionTokenEntity)
    private readonly subscriptionTokenRepository: Repository<SubscriptionTokenEntity>,
  ) {}

  private toDomain(entity: SubscriptionTokenEntity): SubscriptionToken {
    const domainEntity = new SubscriptionToken();
    domainEntity.expiresAt = entity.expiresAt;
    domainEntity.scope = entity.scope;
    domainEntity.token = entity.token;

    return domainEntity;
  }

  find = async (token: string): Promise<SubscriptionToken | null> => {
    const entity = await this.subscriptionTokenRepository.findOne({
      where: { token },
    });

    if (!entity) {
      return null;
    }

    return this.toDomain(entity);
  };
}

export { SubscriptionTokenRepository };
