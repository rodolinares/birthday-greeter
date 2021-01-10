import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  gender: string;
  name: string;
  phone: string;
  // picture: string;
};

const userSchema = new mongoose.Schema(
  {
    gender: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, unique: true }
    // picture: String
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
