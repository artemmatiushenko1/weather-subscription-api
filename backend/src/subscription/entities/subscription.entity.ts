import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Frequency } from '../domain/frequency';
import { SubscriptionTokenEntity } from './subscription-token.entity';

@Entity('subscriptions')
class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  city: string;

  @Column({ type: 'enum', enum: Frequency })
  frequency: Frequency;

  @Column()
  confirmed: boolean;

  @OneToMany(() => SubscriptionTokenEntity, (token) => token.subscription)
  tokens: SubscriptionTokenEntity[];
}

export { SubscriptionEntity };
