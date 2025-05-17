import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendSubscriptionConfirmationEmail(
    recipientEmail: string,
    frequency: string,
    city: string,
    confirmationLink: string,
  ) {
    await this.mailerService.sendMail({
      to: recipientEmail,
      subject: '✅ Confirm your weather subscription',
      template: 'confirm-subscription',
      context: {
        email: recipientEmail,
        confirmationLink,
        frequency,
        city,
      },
    });
  }

  async sendWeatherUpdateEmail(
    recipientEmail: string,
    frequency: string,
    city: string,
    humidity: string,
    temperature: string,
    description: string,
    unsubscribeLink: string,
  ) {
    await this.mailerService.sendMail({
      to: recipientEmail,
      subject: `🌡️ Your ${frequency} Weather Update`,
      template: 'weather-update',
      context: {
        unsubscribeLink,
        frequency,
        city,
        humidity,
        temperature,
        description,
      },
    });
  }
}
