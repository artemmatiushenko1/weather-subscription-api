import { z } from 'zod';

export const weatherApiCurrentSchema = z.object({
  current: z.object({
    temp_c: z.number(),
    humidity: z.number(),
    condition: z.object({
      text: z.string(),
    }),
  }),
});

export const weatherApiCurrentErrorSchema = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});
