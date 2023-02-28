import { Injectable } from "@nestjs/common";
import { Activity } from "./interfaces/activity.interface";

@Injectable()
export class HomeService {
  getPopularActivities(): Activity[] {
    return [
      {
        id: 1,
        name: "这不是饼干，这是活动 1",
        description: "Description 1",
        link: "https://www.google.com",
      },
      {
        id: 2,
        name: "这不是饼干，这是活动 2",
        description: "Description 2",
        link: "https://www.google.com",
      },
      {
        id: 3,
        name: "这不是饼干，这是活动 3",
        description: "Description 3",
        link: "https://www.google.com",
      },
      {
        id: 4,
        name: "这不是饼干，这是活动 4",
        description: "Description 4",
        link: "https://www.google.com",
      },
      {
        id: 5,
        name: "这不是饼干，这是活动 5",
        description: "Description 5",
        link: "https://www.google.com",
      },
    ];
  }
}
