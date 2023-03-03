import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import Mail from "nodemailer/lib/mailer";
import { SafeUser, User } from "src/user/interfaces/user.interface";
import { UserService } from "src/user/user.service";
import { verifyEmailHtml } from "./verify.template";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject("SMTP_CONNECTION") private smtpTransport: Mail,
  ) {}

  async validateUser(username: string, pass: string): Promise<SafeUser> {
    const user = await this.userService.findOne(username);
    if (user && user.pwd === pass) {
      const safeUser: SafeUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        desc: user.desc,
        create_time: user.create_time,
      };
      return safeUser;
    }
    return null;
  }

  async findUser(id: string): Promise<SafeUser> {
    const user = await this.userService.findById(id);
    if (user) {
      const safeUser: SafeUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        desc: user.desc,
        create_time: user.create_time,
      };
      return safeUser;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async checkUsernameAvailability(username: string): Promise<boolean> {
    const user = await this.userService.findOne(username);
    return user === null;
  }

  async sendVerificationMail(
    destination: string,
    username: string,
    verifyLink: string,
  ) {
    this.smtpTransport
      .sendMail({
        from: `"在线校园" <${this.configService.get<string>("SMTP.USER")}>`,
        to: destination,
        subject: "验证你的账户",
        html: verifyEmailHtml
          .replace("[Username]", username)
          .replace("[VerifyLink]", verifyLink),
      })
      .catch(console.error);
  }
}
