// models/user.js
const mongoose = require('mongoose');

// Định nghĩa schema cho bảng User trong MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    unique: true, // Không cho trùng địa chỉ ví
  },
  privateKey: {
    type: String,
    required: true,
  },
});

// Export mô hình User để sử dụng ở các nơi khác
module.exports = mongoose.model('User', userSchema);
