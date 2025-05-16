export type WeatherApiCurrentResponse = {
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
    };
  };
};

export type WeatherApiCurrentErrorResponse = {
  error: { code: number; message: string };
};
