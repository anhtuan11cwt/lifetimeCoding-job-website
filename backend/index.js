import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.route.js";
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

// Route kiểm tra
app.get("/home", (_req, res) => {
  res.status(200).json({
    message: "Máy chủ đang chạy thành công!",
    success: true,
  });
});

app.use("/api/v1/user", userRouter);

// Kết nối cơ sở dữ liệu và khởi động máy chủ
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
  });
});
