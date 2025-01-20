import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Interface for the User model
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber?: number;
  addresses: Array<{
    country: string;
    city: string;
    address1: string;
    address2: string;
    zipCode: number;
    addressType: string;
  }>;
  role: string;
  avatar: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  resetPasswordToken?: string;
  resetPasswordTime?: Date;
  getJwtToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
