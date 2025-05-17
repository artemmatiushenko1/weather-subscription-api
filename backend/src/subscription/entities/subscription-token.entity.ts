import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubscriptionTokenScope } from '../domain/subscription-token-scope';
import { SubscriptionEntity } from './subscription.entity';

@Entity('subscription_tokens')
class SubscriptionTokenEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  token: string;

  @Column()
  expiresAt: Date;

  @Column({ type: 'enum', enum: SubscriptionTokenScope })
  scope: SubscriptionTokenScope;

  @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.tokens, {
    onDelete: 'CASCADE',
  })
  subscription: SubscriptionEntity;
}

export { SubscriptionTokenEntity };
