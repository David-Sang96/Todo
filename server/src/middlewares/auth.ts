import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { USER } from "../models/user";
import asyncHandler from "../utils/asyncHandler";

interface User {
  name: string;
  email: string;
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomJWtPayload extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const isAuth = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies ? req.cookies.token : null;

    if (!token) {
      res.status(401);
      throw new Error("Unauthorized user");
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as CustomJWtPayload;

      req.user = (await USER.findById(decoded.userId).select(
        "-password -__v"
      )) as User;
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        res.status(401);
        throw new Error("Token expired");
      }
      res.status(401);
      throw new Error("Unauthorized user,invalid token");
    }
  }
);

export { isAuth };
