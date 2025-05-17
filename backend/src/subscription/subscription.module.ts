import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionEntity } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SUBSCRIPTION_REPOSITORY_TOKEN } from './interfaces/subscription-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  providers: [
    SubscriptionService,
    {
      provide: SUBSCRIPTION_REPOSITORY_TOKEN,
      useClass: SubscriptionRepository,
    },
  ],
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
