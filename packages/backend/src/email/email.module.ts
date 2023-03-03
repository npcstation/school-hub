import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { emailProviders } from "./email.provider";

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...emailProviders],
  exports: [...emailProviders],
})
export class EmailModule {}
