import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './app-config/app-config.service';

export const setupSwagger = (app: INestApplication) => {
  const appConfig = app.get(AppConfigService).appConfig;
  const documentConfig = new DocumentBuilder()
    .setTitle('Weather Forecast API')
    .setDescription(
      'Weather API application that allows users to subscribe to weather updates for their city.',
    )
    .addServer(appConfig.apiPrefix)
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig, {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup(`${appConfig.apiPrefix}/docs`, app, document);
};
