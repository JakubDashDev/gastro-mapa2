import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Document } from "mongodb";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const adminUserSchema: Schema<IUser> = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true, lowercase: true },
  password: { type: String, require: true, minLength: 8, select: false },
});

adminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

adminUserSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
