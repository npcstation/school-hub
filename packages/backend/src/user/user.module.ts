import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "src/database/database.module";
import { UserController } from "./user.controller";
import { userProviders } from "./user.provider";
import { UserService } from "./user.service";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
