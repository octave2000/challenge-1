import type { Request, Response, NextFunction } from "express";
import User from "../models/user";
import ErrorHandler from "../utils/ErrorHandler";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import sendMail from "../utils/sendMail";
import sendToken from "../utils/jwtToken";

export const createUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const userEmail = await User.findOne({ email });

      if (userEmail) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        message: "User created successfully!",
        user,
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 400));
      }
      return next(new ErrorHandler("An unknown error occurred", 500));
    }
  }
);

export const loginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid credentials!", 400));
      }

      sendToken(user, 200, res);
    } catch (error) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 500));
      }
      return next(new ErrorHandler("An unknown error occurred", 500));
    }
  }
);

export const loadUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 500));
      }
      return next(new ErrorHandler("An unknown error occurred", 500));
    }
  }
);

export const logoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        success: true,
        message: "Logged out successfully!",
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 500));
      }
      return next(new ErrorHandler("An unknown error occurred", 500));
    }
  }
);

export const updateUserInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid password!", 400));
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 500));
      }
      return next(new ErrorHandler("An unknown error occurred", 500));
    }
  }
);

export const updateUserPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match!", 400));
      }

      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 500));
      }
      return next(new ErrorHandler("An unknown error occurred", 500));
    }
  }
);

export const findUserById = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 500));
      }
      return next(new ErrorHandler("An unknown error occurred", 500));
    }
  }
);

export const adminGetAllUsers = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 500));
      }
      return next(new ErrorHandler("An unknown error occurred", 500));
    }
  }
);

export const adminDeleteUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
      });
    } catch (error) {
      if (error instanceof Error) {
        return next(new ErrorHandler(error.message, 500));
      }
      return next(new ErrorHandler("An unknown error occurred", 500));
    }
  }
);
