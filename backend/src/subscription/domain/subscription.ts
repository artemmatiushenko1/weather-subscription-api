import { Frequency } from './frequency';

class Subscription {
  id: string;
  email: string;
  city: string;
  frequency: Frequency;
  confirmed: boolean;
}

export { Subscription };
