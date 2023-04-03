import { Types } from "mongoose";

export interface SafeUser {
  readonly _id: Types.ObjectId;
  readonly name: string;
  readonly create_time: number;
  readonly desc: string;
  readonly email: string;
  readonly role: number;
}
