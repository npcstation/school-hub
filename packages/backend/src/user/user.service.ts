import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createdUser: User): Promise<User> {
    const user = new this.userModel(createdUser);
    return user.save();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ name: username }).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOccupiedEmail(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async findOccupiedUsername(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ name: username }).exec();
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
