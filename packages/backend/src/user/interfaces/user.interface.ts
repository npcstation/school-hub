import { Document } from "mongoose";

export interface User extends Document {
  readonly name: string;
  readonly create_time: number;
  readonly pwd: string;
  readonly desc: string;
  readonly email: string;
  readonly role: number;
}

export interface SafeUser {
  readonly _id: string;
  readonly name: string;
  readonly create_time: number;
  readonly desc: string;
  readonly email: string;
  readonly role: number;
}
