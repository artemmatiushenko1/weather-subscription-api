import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './domain/subscription';
import { ISubscriptionRepository } from './interfaces/subscription-repository.interface';
import { SubscriptionEntity } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
class SubscriptionRepository implements ISubscriptionRepository {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  private toDomain(entity: SubscriptionEntity): Subscription {
    const domainEntity = new Subscription();
    domainEntity.city = entity.city;
    domainEntity.confirmed = entity.confirmed;
    domainEntity.frequency = entity.frequency;
    domainEntity.email = entity.email;
    domainEntity.id = entity.id;
    return domainEntity;
  }

  get = async (subscription: Subscription): Promise<Subscription | null> => {
    const entity = await this.subscriptionRepository.findOne({
      where: {
        email: subscription.email,
        frequency: subscription.frequency,
        city: subscription.city,
      },
    });

    if (!entity) {
      return null;
    }

    return this.toDomain(entity);
  };

  create = async (subscription: Subscription): Promise<Subscription> => {
    const entity = this.subscriptionRepository.create({
      email: subscription.email,
      city: subscription.city,
      frequency: subscription.frequency,
      confirmed: subscription.confirmed,
    });

    const savedEntity = await this.subscriptionRepository.save(entity);
    return this.toDomain(savedEntity);
  };

  confirm = async (subscriptionId: string): Promise<undefined> => {
    await this.subscriptionRepository.update(subscriptionId, {
      confirmed: true,
    });
  };

  delete = async (subscriptionId: string): Promise<boolean> => {
    const result = await this.subscriptionRepository.delete(subscriptionId);
    return !!result.affected;
  };
}

export { SubscriptionRepository };
