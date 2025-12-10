import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./db/index.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());  

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/api/v1/users", userRouter);

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection failed!!", err);
  });
