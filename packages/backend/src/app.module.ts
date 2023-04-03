import { Module } from "@nestjs/common";
import { HomeModule } from "./home/home.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { EmailModule } from "./email/email.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import mongoose from "mongoose";

@Module({
  imports: [
    HomeModule,
    UserModule,
    AuthModule,
    EmailModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          `mongodb://${configService.get<string>(
            "DATABASE_HOST",
          )}/${configService.get<string>("DATABASE_DB")}` ||
          "mongodb://localhost:27017/hub",
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
