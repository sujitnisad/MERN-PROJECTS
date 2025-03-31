import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/", (req, res) => {
  res.send("hello from sujit bhai");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
