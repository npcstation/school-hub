import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EmailModule } from "src/email/email.module";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";

@Module({
  imports: [ConfigModule.forRoot(), EmailModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
