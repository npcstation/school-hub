import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetOccupation } from "./dto/get-occupation.dto";
import { RegistrationFeedback } from "./dto/register.dto";
import { UserService } from "./user.service";
import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

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

  @Post("register")
  async userRegister(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationFeedback> {
    if (!createUserDto.email) {
      return {
        code: 10001,
        error: "Email is required",
      };
    }
    if (!this.isEmail(createUserDto.email)) {
      return {
        code: 10002,
        error: "Invalid email address",
      };
    }
    if (!createUserDto.name) {
      return {
        code: 10011,
        error: "Username is required",
      };
    }
    if (!createUserDto.pwd) {
      return {
        code: 10021,
        error: "Password is required",
      };
    }
    if (this.findOccupiedUsername(createUserDto.name)) {
      return {
        code: 20001,
        error: "Username is occupied",
      };
    }
    if (this.findOccupiedEmail(createUserDto.email)) {
      return {
        code: 20001,
        error: "Username is occupied",
      };
    }

    const saltOrRounds = 10;
    const password = createUserDto.pwd;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const createdUser: User = {
      name: createUserDto.name,
      pwd: hash,
      desc: createUserDto.desc,
      email: createUserDto.email,
      role: 0,
      create_time: Date.now(),
    };

    await this.userService.create(createdUser);

    return {
      code: 0,
      result: true,
    };
  }
}
