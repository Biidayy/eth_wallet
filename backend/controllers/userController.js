const Web3 = require("web3");
const User = require("../models/user");
const Transaction = require("../models/Transaction");

// Khởi tạo kết nối Web3 với local RPC (Ganache)
const web3 = new Web3("http://127.0.0.1:8545");

// Tạo user mới
const createUser = async (req, res) => {
  const { name, walletAddress, privateKey } = req.body;

  try {
    const newUser = new User({
      name,
      address: walletAddress, // Lưu địa chỉ ví vào field 'address'
      privateKey,
    });
    await newUser.save();
    res.status(201).json({ message: "Tạo user thành công", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo user", error });
  }
};

// Lấy danh sách tất cả user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
  }
};

// Gửi ETH từ người gửi sang người nhận
const transferETH = async (req, res) => {
  const { from, to, amount } = req.body;

  try {
    const amountInWei = web3.utils.toWei(amount.toString(), "ether");

    const receipt = await web3.eth.sendTransaction({
      from,
      to,
      value: amountInWei,
    });

    const newTransaction = new Transaction({
      from,
      to,
      amount,
      txHash: receipt.transactionHash,
    });

    await newTransaction.save();

    res.status(200).json({ message: "Giao dịch thành công", receipt });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi gửi ETH", error });
  }
};

// Lấy lịch sử giao dịch
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy lịch sử giao dịch", error });
  }
};

//  Lấy số dư ETH từ địa chỉ ví
const getBalance = async (req, res) => {
  const { address } = req.params;

  try {
    const balanceWei = await web3.eth.getBalance(address);
    const balanceETH = web3.utils.fromWei(balanceWei, "ether");
    res.status(200).json({ address, balance: balanceETH });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy số dư", error });
  }
};

//  Xóa user theo ID MongoDB
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Không tìm thấy user để xóa" });
    }
    res.status(200).json({ message: "Xóa user thành công", user: deleted });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa user", error });
  }
};
/// Xuất các hàm controller để sử dụng trong routes
module.exports = {
  createUser,
  getAllUsers,
  transferETH,
  getTransactions,
  getBalance,    
  deleteUser,    
};
