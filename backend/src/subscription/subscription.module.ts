import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionEntity } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SUBSCRIPTION_REPOSITORY_TOKEN } from './interfaces/subscription-repository.interface';
import { SubscriptionTokenEntity } from './entities/subscription-token.entity';
import { SUBSCRIPTION_TOKEN_REPOSITORY_TOKEN } from './interfaces/subscription-token-repository.interface';
import { SubscriptionTokenRepository } from './subscription-token.repository';
import { EmailModule } from 'src/email/email.module';
import { SubscriptionTokenManager } from './subscription-token-manager';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forFeature([SubscriptionEntity, SubscriptionTokenEntity]),
  ],
  providers: [
    SubscriptionService,
    {
      provide: SUBSCRIPTION_REPOSITORY_TOKEN,
      useClass: SubscriptionRepository,
    },
    {
      provide: SUBSCRIPTION_TOKEN_REPOSITORY_TOKEN,
      useClass: SubscriptionTokenRepository,
    },
    SubscriptionTokenManager,
  ],
  controllers: [SubscriptionController],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
