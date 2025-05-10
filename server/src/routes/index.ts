import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
} from "../controllers/todo";
import { isAuth } from "../middlewares/auth";
import authorize from "../middlewares/authorize";

const router = express.Router();

router.post("/create", isAuth, createTodo);
router.get("/", getAllTodo);
router.get("/:id", getSingleTodo);
router.put("/:id", isAuth, authorize, updateTodo);
router.delete("/:id", isAuth, authorize, deleteTodo);

export default router;
