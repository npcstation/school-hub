import { Controller, Get } from "@nestjs/common";
import { User } from "./interfaces/user.interface";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("all")
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
