const SettingModel = require("../models/Setting");
const tatumController = require("../controllers/tatum");

const initTatumETH = async () => {
  try {
    let ethSetting = await SettingModel.exists({ key: "ETHWalletInfo" });
    if (!ethSetting) {
      let ethWallet = await tatumController.createEthereumWallet();
      if (ethWallet === null)
        return console.error("initTatumETH createEthereumWallet Error");

      let virtualAccount = await tatumController.createVirtualAccount({
        xpub: ethWallet.xpub,
        coinType: "ETH",
      });
      if (virtualAccount === null)
        return console.error("initTatumETH createVirtualAccount Error");

      SettingModel.create({
        key: "ETHWalletInfo",
        dataObject: {
          mnemonic: ethWallet.mnemonic,
          xpub: ethWallet.xpub,
          virtualAccount: virtualAccount,
        },
      });
      console.log("ETHWalletInfo setting firstly saved");
    }
  } catch (err) {
    console.error({
      title: "initContoller - initTatumETH",
      message: err.message,
    });
    return undefined;
  }
};

const initTatumSOL = async () => {
  try {
    let solSetting = await SettingModel.exists({ key: "SOLWalletInfo" });
    if (!solSetting) {
      let solWallet = await tatumController.createSolanaWallet();
      if (solWallet === null) return console.error("initTatumSOL Error");

      let virtualAccount = await tatumController.createVirtualAccount({
        xpub: solWallet.xpub,
        coinType: "SOL",
      });
      if (virtualAccount === null)
        return console.error("initTatumETH createVirtualAccount Error");

      SettingModel.create({
        key: "SOLWalletInfo",
        dataObject: {
          mnemonic: solWallet.mnemonic,
          xpub: solWallet.xpub,
          virtualAccount: virtualAccount,
        },
      });
      console.log("SOLWalletInfo setting firstly saved");
    }
  } catch (err) {
    console.error({
      title: "initTatumSOL",
      message: err.message,
    });
    return undefined;
  }
};

module.exports = {
  initTatumETH,
  initTatumSOL,
};
