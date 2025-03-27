import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import connectDB from "./db";
import errorHandler from "./middlewares/errorHandler";
import todoRoutes from "./routes";
import authRoutes from "./routes/auth";

config();

const PORT = process.env.PORT || "5100";
const app = express();

app
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(cors({ origin: process.env.CLIENT_URL }))
  .use(cookieParser());

app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT : ${PORT}`);
});
