const mongoose = require("mongoose");

const balanceObject = {
  data: [
    { coinType: "ETH", balance: 0, chain: "ETH", type: "native" },
    { coinType: "SOL", balance: 0, chain: "SOL", type: "native" },
  ],
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chipsAmount: {
    type: Number,
    default: 0,
  },
  type: {
    type: Number,
    default: 0,
  },
  balance: { type: Object, default: balanceObject },
  currency: { type: Object, default: { coinType: "ETH", type: "native" } },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
