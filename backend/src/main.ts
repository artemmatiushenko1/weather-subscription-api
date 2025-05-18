import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './app-config/app-config.service';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const appConfig = app.get(AppConfigService).appConfig;
  // app.setGlobalPrefix(appConfig.apiPrefix);

  setupSwagger(app);

  await app.listen(appConfig.port);

  console.info(`Server is running on ${await app.getUrl()}`);
}

void bootstrap();
