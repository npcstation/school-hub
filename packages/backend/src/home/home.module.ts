import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "src/database/database.module";
import { EmailModule } from "src/email/email.module";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, EmailModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
