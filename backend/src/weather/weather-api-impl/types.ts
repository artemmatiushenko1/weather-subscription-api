export type WeatherApiCurrentResponse = {
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
    };
  };
};
