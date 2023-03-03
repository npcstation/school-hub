import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const emailProviders = [
  {
    provide: "SMTP_CONNECTION",
    useFactory: (configService: ConfigService): Mail =>
      createTransport(
        `smtps://${configService.get<string>(
          "SMTP.USER",
        )}:${configService.get<string>(
          "SMTP.PASS",
        )}@${configService.get<string>(
          "SMTP.HOST",
        )}:${configService.get<string>("SMTP.PORT")}/?pool=true`,
      ),
    inject: [ConfigService],
  },
];
