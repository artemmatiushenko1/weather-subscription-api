import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Frequency } from '../domain/frequency';

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
}

export { SubscriptionEntity };
