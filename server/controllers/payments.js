const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const WalletModel = require("../models/Wallet");
const UserModel = require("../models/User");
const TransactionsModel = require("../models/Transactions");
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
    let { coinType, type, userId } = req.body;
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

const tatumWebhook = async (req, res) => {
  try {
    let {
      address,
      amount,
      counterAddress,
      asset,
      blockNumber,
      txId,
      type,
      subscriptionType,
      tokenId,
    } = req.body;
    console.log(req.body);
    let currency = { coinType: "", type: "" };
    console.log("webhook here");
    if (type === "native") {
      currency = {
        coinType: "ETH",
        type: type,
      };
    } else {
      const matchedAsset = AssetList.find(
        (item) => item.asset.toLowerCase() === asset.toLowerCase()
      );
      currency = { coinType: matchedAsset.coinType, type: matchedAsset.type };
      if (tokenId === null) {
        let tempAddr = counterAddress;
        counterAddress = address;
        address = tempAddr;
      }
    }

    let txData = await TransactionsModel.findOne({ txId });
    if (!txData) {
      console.log("New Tatum Webhook ===>");
      console.log(req.body);
      await new TransactionsModel({
        txId,
        amount,
        from: counterAddress,
        to: address,
        date: new Date(),
        blockNumber,
        subscriptionType,
        currency,
      }).save();
      let walletData = await WalletModel.findOne({ address: address });
      if (walletData) {
        let userData = await UserModel.findOne({
          _id: walletData.userId,
        });
        let balanceData = userData.balance.data.find(
          (data) =>
            data.coinType === currency.coinType && data.type === currency.type
        );
        balanceData.balance += Number(amount);
        await UserModel.findOneAndUpdate(
          { _id: walletData.userId },
          { balance: userData.balance }
        );
      }
    }
  } catch (err) {
    console.error({
      title: "cryptoController - tatumWebhook",
      message: err.message,
    });
    return res.json({ status: false, data: null, message: "Server Error" });
  }
};

const updateBalance = async (req, res) => {
  try {
    const { currency, amount, txHash, from, to } = req.body;
    const txId = txHash;
    const blockNumber = null;
    const subscriptionType = "ADDRESS_TRANSACTION";
    let txData = await TransactionsModel.findOne({ txId });
    if (!txData) {
      await new TransactionsModel({
        txId,
        amount,
        from: from,
        to: to,
        date: new Date(),
        blockNumber,
        subscriptionType,
        currency,
      }).save();
      let walletData = await WalletModel.findOne({ address: to.toLowerCase() });
      if (walletData) {
        let userData = await UserModel.findOne({
          _id: walletData.userId,
        });
        let balanceData = userData.balance.data.find(
          (data) =>
            data.coinType === currency.coinType && data.type === currency.type
        );
        balanceData.balance += Number(amount);
        await UserModel.findOneAndUpdate(
          { _id: walletData.userId },
          { balance: userData.balance }
        );
        return res.json({ status: true, message: "success" });
      }
    }
  } catch (err) {
    console.error({
      title: "cryptoController - tatumWebhook",
      message: err.message,
    });
    return res.json({ status: false, data: null, message: "Server Error" });
  }
};

module.exports = {
  getDepositAddressFromAccount,
  tatumWebhook,
  updateBalance,
};
