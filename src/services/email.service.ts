import config from 'config';
import nodemailer, { Transporter } from 'nodemailer';

import { IUser } from '@/models/user/user.entity';
import { ServerError } from '@/models/apiError/apiError.entity';

import { ApiErrorDatabase } from '@/models/apiError/apiError.database';

const emailService = config.get<string>('emailService');
const emailUser = config.get<string>('emailUser');
const emailPassword = config.get<string>('emailPassword');

interface SendResetPasswordEmailInput {
  email: IUser['email'];
  subject: string;
  text: string;
  html: string;
}

export class EmailService {
  private apiErrorDb: ApiErrorDatabase;
  private transporter: Transporter;

  constructor() {
    this.apiErrorDb = new ApiErrorDatabase();
    this.transporter = nodemailer.createTransport({
      service: emailService,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });
  }

  async sendEmail({
    email,
    subject,
    text,
    html,
  }: SendResetPasswordEmailInput): Promise<void> {
    try {
      let emailOptions = {
        from: emailUser,
        to: email,
        subject,
        text,
        html,
      };
      await this.transporter.sendMail(emailOptions);
    } catch (error) {
      console.error(error);
      const sendEmailError = new ServerError({
        path: 'emailService.sendEmail',
        type: 'API',
        details: 'email_service_failure',
      });
      this.apiErrorDb.create(sendEmailError);
    }
  }
}
