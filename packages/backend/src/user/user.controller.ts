import { Controller, Get, Query } from "@nestjs/common";
import { GetOccupation } from "./dto/get-occupation.dto";
import { User } from "./interfaces/user.interface";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  isEmail(email: string): boolean {
    return /^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/i.test(email);
  }

  @Get("occupiedEmail")
  async findOccupiedEmail(
    @Query("email") email: string,
  ): Promise<GetOccupation> {
    if (!email) {
      return {
        code: 10001,
        error: "Email is required",
      };
    }
    if (!this.isEmail(email)) {
      return {
        code: 10002,
        error: "Invalid email address",
      };
    }
    return {
      code: 0,
      occupation: await this.userService.findOccupiedEmail(email),
    };
  }

  @Get("occupiedUsername")
  async findOccupiedUsername(
    @Query("username") username: string,
  ): Promise<GetOccupation> {
    if (!username) {
      return {
        code: 10001,
        error: "Username is required",
      };
    }
    return {
      code: 0,
      occupation: await this.userService.findOccupiedUsername(username),
    };
  }
}
