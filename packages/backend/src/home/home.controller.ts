import { Controller, Get, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Mail from "nodemailer/lib/mailer";
import { HomeService } from "./home.service";
import { Activity } from "./interfaces/activity.interface";

@Controller("home")
export class HomeController {
  constructor(
    private homeService: HomeService,
    private database: ConfigService,
  ) {}

  @Get("popular")
  async getPopularActivities(): Promise<Activity[]> {
    return this.homeService.getPopularActivities();
  }
}
