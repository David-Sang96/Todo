import { NextFunction, Request, Response } from "express";

import { TODO } from "../models/todo";
import asyncHandler from "../utils/asyncHandler";

const authorize = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const todo = await TODO.findById(id);

    if (!todo) {
      res.status(404);
      throw new Error("Todo not found");
    }

    if (todo.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("You are not allowed to perform this action");
    }
    next();
  }
);

export default authorize;
