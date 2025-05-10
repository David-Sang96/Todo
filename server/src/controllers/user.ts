import { NextFunction, Request, Response } from "express";
import { USER } from "../models/user";
import asyncHandler from "../utils/asyncHandler";
import { generateToken } from "../utils/generateToken";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    const isUserExisted = await USER.findOne({ email });
    if (isUserExisted) {
      res.status(400);
      throw new Error("Email already exist");
    }

    const user = await USER.create({ email, name, password });
    res.status(201).json({
      message: "User created successfully",
      user: { _id: user._id, name: user.name, email: user.email },
    });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const isUserExisted = await USER.findOne({ email });
    if (!isUserExisted) {
      res.status(401);
      throw new Error("Invalid credential");
    }

    const isMatch = await isUserExisted.isMatchPassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credential");
    }

    generateToken(res, isUserExisted._id);
    res.json({
      message: "Logged in successfully",
      user: {
        _id: isUserExisted._id,
        name: isUserExisted.name,
        email: isUserExisted.email,
      },
    });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });
    // res.clearCookie("token");
    res.json({ message: "logged out successfully" });
  }
);

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id, name, email } = req.user;
    const user = { _id, name, email };
    res.json({ message: "User profilde", user });
  }
);

export const updateUserProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await USER.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    await user.save();

    if (req.body.password) {
      user.password = req.body.password;
      const updatedUser = await user.save();
      res.cookie("token", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0),
      });
      res.json({
        message: "Account info updated.Plase login again",
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    }

    res.json({
      message: "User profile update",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }
);
