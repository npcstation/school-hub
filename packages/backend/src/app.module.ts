import { Module } from "@nestjs/common";
import { HomeController } from "./home/home.controller";
import { HomeService } from "./home/home.service";

@Module({
  controllers: [HomeController],
  providers: [HomeService],
})
export class AppModule {}
