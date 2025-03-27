import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
} from "../controllers/todo";

const router = express.Router();

router.post("/create", createTodo);
router.get("/", getAllTodo);
router.get("/:id", getSingleTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
