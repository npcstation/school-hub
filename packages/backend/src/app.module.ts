import { Module } from "@nestjs/common";
import { HomeModule } from "./home/home.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { EmailModule } from './email/email.module';

@Module({
  imports: [HomeModule, UserModule, AuthModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
