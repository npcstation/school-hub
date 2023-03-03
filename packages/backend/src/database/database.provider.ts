import { ConfigService } from "@nestjs/config";
import * as mongoose from "mongoose";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb://${configService.get<string>(
          "DATABASE.HOST",
        )}/${configService.get<string>("DATABASE.DB")}` ||
          "mongodb://localhost:27017/hub",
      ),
    inject: [ConfigService],
  },
];
