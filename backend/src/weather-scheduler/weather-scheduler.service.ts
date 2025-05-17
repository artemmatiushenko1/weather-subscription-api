import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';
import { Frequency } from 'src/subscription/domain/frequency';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { WeatherService } from 'src/weather/weather.service';

@Injectable()
export class WeatherSchedulerService {
  private readonly logger = new Logger(WeatherSchedulerService.name);

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly weatherService: WeatherService,
    private readonly emailService: EmailService,
  ) {}

  async sendUpdate(frequency: Frequency) {
    const subscriptions =
      await this.subscriptionService.getSubscriptionsByFrequency(frequency);

    await Promise.allSettled(
      subscriptions.map(async (subscription) => {
        try {
          const weather = await this.weatherService.getCurrentWeather(
            subscription.city,
          );
          const unsubscribeToken =
            await this.subscriptionService.getUnsubscribeToken(subscription.id);

          // console.log({ unsubscribeToken });

          await this.emailService.sendWeatherUpdateEmail(
            subscription.email,
            subscription.frequency,
            subscription.city,
            weather,
            // TODO: build correct link
            `http://localhost:3000/unsubscribe/${unsubscribeToken.token}`,
          );
          this.logger.log(
            `Sent ${subscription.frequency} update for subscription ${subscription.id}`,
          );
        } catch (e: unknown) {
          if (e instanceof Error) {
            this.logger.error(
              `Failed to send ${subscription.frequency} update for subscription ${subscription.id}.`,
            );
          }
        }
      }),
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async sendDailyUpdate() {
    await this.sendUpdate(Frequency.DAILY);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async sendHourlyUpdate() {
    await this.sendUpdate(Frequency.HOURLY);
  }
}
