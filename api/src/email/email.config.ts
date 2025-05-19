import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const schema = z.object({
  nodemailer: z.object({
    user: z.string().nonempty(),
    password: z.string().nonempty(),
  }),
});

export type EmailConfig = z.infer<typeof schema>;

export default registerAs('email', () => {
  const envs = schema.parse({
    nodemailer: {
      user: process.env.NODEMAILER_USER,
      password: process.env.NODEMAILER_PASS,
    },
  });

  return envs;
});
