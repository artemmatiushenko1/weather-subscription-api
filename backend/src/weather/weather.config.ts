import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const schema = z.object({
  weatherApiKey: z.string().nonempty(),
});

export type WeatherConfig = z.infer<typeof schema>;

export default registerAs('weather', () => {
  const envs = schema.parse({
    weatherApiKey: process.env.WEATHER_API_KEY,
  });

  return envs;
});
