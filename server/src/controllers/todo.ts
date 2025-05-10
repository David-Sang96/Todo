import { NextFunction, Request, Response } from "express";
import { TODO } from "../models/todo";
import asyncHandler from "../utils/asyncHandler";

export const createTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    const userId = req.user._id;

    const todo = await TODO.create({ title, userId });
    res.status(201).json({ message: "Created successfully", todo });
  }
);

export const getAllTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await TODO.find().select("-__v");
    res.json(todos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      console.log("Error in todo get all controller: ", error);
    }
  }
};

export const getSingleTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = await TODO.findById(id).select("-__v");
    if (!todo) {
      res.json({ messsage: "todo not found" });
      return;
    }
    res.json(todo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      console.log("Error in todo get single controller: ", error);
    }
  }
};

export const updateTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title } = req.body;
    const { id } = req.params;

    const todo = await TODO.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    ).select("-__v");
    res.json({ todo, message: "Updated successfully" });
  }
);

export const deleteTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await TODO.findByIdAndDelete(id);
    res.json({ message: "Deleted successfully" });
  }
);
