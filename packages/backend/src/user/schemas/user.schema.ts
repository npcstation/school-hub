import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: String,
  create_time: Number,
  pwd: String,
  desc: String,
  email: String,
  role: Number,
});
