import { Controller, Get } from "@nestjs/common";
import { GetActivity } from "./dto/get-activity.dto";
import { HomeService } from "./home.service";

@Controller("home")
export class HomeController {
  constructor(private homeService: HomeService) {}

  @Get("popular")
  async getPopularActivities(): Promise<GetActivity> {
    return { code: 0, activities: this.homeService.getPopularActivities() };
  }
}
