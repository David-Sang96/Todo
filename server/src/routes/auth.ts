import { Router } from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
  updateUserProfile,
} from "../controllers/user";
import { isAuth } from "../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router
  .route("/profile")
  .get(isAuth, getUserProfile)
  .put(isAuth, updateUserProfile);

export default router;
