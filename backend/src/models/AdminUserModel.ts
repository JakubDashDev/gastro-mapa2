import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Document } from "mongodb";
import crypto from "crypto";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  passwordChangeAt: number;
}

const adminUserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true, minLength: 8, select: false },
  passwordConfirm: {
    type: String,
    required: [true, "Proszę, potwierdź swoje hasło"],
  },
  passwordChangeAt: Date,
});
adminUserSchema.pre("validate", async function (next) {
  if (this.password !== this.passwordConfirm) {
    this.invalidate("passwordConfirm", "Hasła nie są identyczne!");
  }

  next();
});

adminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;

  next();
});

adminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

adminUserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const AdminUser = mongoose.model("AdminUser", adminUserSchema);

export default AdminUser;
