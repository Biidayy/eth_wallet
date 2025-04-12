const express = require("express");
const router = express.Router();
// Import các hàm controller từ userController
const {
  createUser,
  getAllUsers,
  transferETH,
  getTransactions,
  getBalance,
  deleteUser,
} = require("../controllers/userController");

router.post("/create", createUser);                  
router.get("/all", getAllUsers);                     
router.post("/transfer", transferETH);               
router.get("/transactions", getTransactions);      
router.get("/balance/:address", getBalance);         
router.delete("/:id", deleteUser);                  
// Xuất router để sử dụng trong file index.js
module.exports = router;
