// Nạp các module cần thiết
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Khởi tạo app express
const app = express();

// Nạp biến môi trường từ file .env
dotenv.config();

// Middleware để xử lý JSON và CORS
app.use(cors());
app.use(express.json());

// Kết nối MongoDB bằng Mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Đã kết nối MongoDB thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Nạp Web3 và gán vào ứng dụng để sử dụng sau này
const Web3 = require("web3");
const web3 = new Web3(process.env.RPC_URL);
app.set("web3", web3);

// Import các route
const userRoutes = require("./routes/user");

// Dùng route: mọi route bắt đầu bằng /api/user sẽ được xử lý trong routes/user.js
app.use("/api/user", userRoutes);

// Khởi chạy server tại PORT từ .env hoặc 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
