import { Transporter, createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

class SMTPConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

export class EmailService {
    transporters: Map<string, Transporter>;
    configs: Map<string, SMTPConfig>;
    callback: Function;

    constructor(configs: Map<string, SMTPConfig>, callbackFunction: Function) {
        this.transporters = new Map();
        this.configs = configs;
        this.callback = callbackFunction;
    }

    async init() {
        for (const key in this.configs) {
            this.transporters.set(key, createTransport(this.configs[key]));
        }
    }

    async sendMail(
        transporter: string,
        mailOptions: Mail.Options
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.transporters
                .get(transporter)
                .sendMail(mailOptions, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
                });
        });
    }
}

const urls: Map<string, SMTPConfig> = global.Project.config.smtp;

export async function apply() {
    await emails.init();
}

export const emails = new EmailService(urls, (err, res) => {
    console.log(res);
});
