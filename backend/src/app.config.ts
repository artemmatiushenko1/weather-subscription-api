import { registerAs } from '@nestjs/config';
import { z } from 'zod';

export enum Environment {
  DEV = 'dev',
  PROD = 'prod',
  TEST = 'test',
}

const schema = z.object({
  env: z.enum([Environment.DEV, Environment.PROD, Environment.TEST]),
  port: z.number().default(3000),
});

export type AppConfig = z.infer<typeof schema>;

export default registerAs('app', () => {
  const envs = schema.parse({
    env: process.env.NODE_ENV,
    port: parseInt(process.env.SERVER_PORT ?? ''),
  });

  return envs;
});
