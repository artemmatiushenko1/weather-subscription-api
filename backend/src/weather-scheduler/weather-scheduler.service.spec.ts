import { Test, TestingModule } from '@nestjs/testing';
import { WeatherSchedulerService } from './weather-scheduler.service';

describe('WeatherSchedulerService', () => {
  let service: WeatherSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherSchedulerService],
    }).compile();

    service = module.get<WeatherSchedulerService>(WeatherSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
