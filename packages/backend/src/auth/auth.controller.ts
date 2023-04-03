import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { User } from "src/user/schemas/user.schema";
import { AuthService } from "./auth.service";
import { JwtGuard } from "./jwt.strategy";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    const user = await this.authService.findUser(req.user.sub);
    return user;
  }
}
