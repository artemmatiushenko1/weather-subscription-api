import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WeatherModule,
    SubscriptionModule,
    EmailModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      // TODO: use config service
      host: process.env.POSTGRES_HOST as unknown as string,
      port: process.env.POSTGRES_PORT as unknown as number,
      username: process.env.POSTGRES_USER as unknown as string,
      password: process.env.POSTGRES_PASSWORD as unknown as string,
      database: process.env.POSTGRES_DB as unknown as string,
      synchronize: process.env.NODE_ENV === 'dev' ? true : false,
      entities: [__dirname + './**/*.entity.{js,ts}'],
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
