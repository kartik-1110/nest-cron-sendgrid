import { Controller, Post, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // Here we use query parameter to get the email that we want to send
  @Post()
  async sendEmail(@Query('email') email) {
    const mail = {
      to: email,
      subject: 'Hello from sendgrid',
      from: '...', // Fill it with your validated email on SendGrid account
      text: 'Hello',
      html: '<h1>Hello</h1>',
    };

    return await this.emailService.send(mail);
  }
}
