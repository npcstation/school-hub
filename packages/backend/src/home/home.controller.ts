import { Controller, Get } from "@nestjs/common";
import { HomeService } from "./home.service";
import { Activity } from "./interfaces/activity.interface";

@Controller("home")
export class HomeController {
  constructor(private catsService: HomeService) {}

  @Get("popular")
  async getPopularActivities(): Promise<Activity[]> {
    return this.catsService.getPopularActivities();
  }
}
