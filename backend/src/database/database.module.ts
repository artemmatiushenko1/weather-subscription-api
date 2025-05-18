import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigService } from 'src/app-config/app-config.service';
import { Environment } from 'src/app/app.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        const postgresConfig = appConfigService.databaseConfig.postgres;
        const appConfig = appConfigService.appConfig;

        return {
          type: 'postgres',
          host: postgresConfig.host,
          port: postgresConfig.port,
          username: postgresConfig.username,
          password: postgresConfig.password,
          database: postgresConfig.database,
          synchronize: appConfig.env === Environment.DEV ? true : false,
          autoLoadEntities: true,
          migrationsRun: true,
          entities: ['dist/**/*.entity{.ts,.js}'],
          migrations: ['dist/database/migrations/*{.ts,.js}'],
          logging: ['info', 'migration'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
