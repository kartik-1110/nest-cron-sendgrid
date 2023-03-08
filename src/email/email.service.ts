import { Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor() {
    // Don't forget this one.
    // The apiKey is required to authenticate our
    // request to SendGrid API.
    SendGrid.setApiKey(process.env.SEND_GRID_KEY);
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }
}
