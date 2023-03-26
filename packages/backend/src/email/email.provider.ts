import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const emailProviders = [
  {
    provide: "SMTP_CONNECTION",
    useFactory: (configService: ConfigService): Mail =>
      createTransport(
        `smtps://${configService.get<string>(
          "SMTP_USER",
        )}:${configService.get<string>(
          "SMTP_PASS",
        )}@${configService.get<string>(
          "SMTP_HOST",
        )}:${configService.get<string>("SMTP_PORT")}/?pool=true`,
      ),
    inject: [ConfigService],
  },
];
