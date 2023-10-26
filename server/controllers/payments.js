const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const WalletModel = require("../models/Wallet");
const tatumController = require("../controllers/tatum");

const AssetList = [
  {
    coinType: "USDT",
    type: "erc-20",
    asset: "0x7c16fD73095428302b7eCcD84ABd1e96d242395A",
  },
];

const getDepositAddressFromAccount = async (req, res) => {
  try {
    let { coinType, userId } = req.body;
    if (coinType) {
      let walletData = await WalletModel.findOne({
        userId,
        currency: coinType,
      });
      if (walletData) {
        return res.json({ status: true, data: walletData });
      } else {
        let response = await tatumController.getDepositAddressFromAccount({
          coinType,
        });
        console.log("response", response);

        if (response !== null) {
          let data = await new WalletModel({
            address: response.address,
            xpub: response.xpub,
            derivationKey: response.derivationKey,
            currency: coinType,
            userId: userId,
            privateKey: response.key,
          }).save();
          return res.json({ status: true, data: data });
        } else {
          return res.json({
            status: false,
            data: response,
            message: "API Error",
          });
        }
      }
    } else {
      return res.json({
        status: false,
        data: null,
        message: "Invalid Request",
      });
    }
  } catch (err) {
    console.error({
      title: "payment - getDepositAddressFromAccount",
      message: err.message,
    });
    return res.json({ status: false, data: null, message: "Server Error" });
  }
};

module.exports = {
  getDepositAddressFromAccount,
};
