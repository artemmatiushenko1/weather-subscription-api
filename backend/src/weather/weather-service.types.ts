export type GetCurrentWeatherRequest = {
  city: string;
};

export type GetCurrentWeatherResponse = {
  humidity: number;
  description: string;
  temperature: number;
};
