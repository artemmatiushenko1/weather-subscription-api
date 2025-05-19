import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const schema = z.object({
  postgres: z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
    host: z.string().nonempty(),
    port: z.number(),
    database: z.string().nonempty(),
  }),
});

export type DatabaseConfig = z.infer<typeof schema>;

export const validateDatabaseConfig = () => {
  const envs = schema.parse({
    postgres: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT ?? ''),
      database: process.env.POSTGRES_DB,
    },
  });

  return envs;
};

export default registerAs('database', validateDatabaseConfig);
