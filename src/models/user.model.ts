import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  birth_date: number;
  gender: string;
  name: string;
  phone: string;
  // picture: string;
};

const userSchema = new mongoose.Schema(
  {
    birth_date: { type: Number, required: true },
    gender: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, unique: true }
    // picture: String
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
