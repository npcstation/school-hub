import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  create_time: number;

  @Prop({ required: true })
  pwd: string;

  @Prop()
  desc: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  role: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
