const Axios = require("axios");
const config = require("../config");
const SettingModel = require("../models/Setting");
const Tatum = require("@tatumio/tatum");

const TatumAxios = Axios.create();
TatumAxios.defaults.timeout = 50000;
TatumAxios.defaults.baseURL = "https://api.tatum.io/v3";
TatumAxios.defaults.headers.common["x-api-key"] =
  config.TATUM_OPTION[config.NETWORK].apikey;
TatumAxios.defaults.headers.common["Content-Type"] = "application/json";
TatumAxios.defaults.headers.post["Content-Type"] = "application/json";

const NativeData = {
  "erc-20": "ETH",
  solana: "SOL",
};

// const createSubscription = async (data, subscriptionType) => {
//   try {
//     console.log("data", data);
//     const { address, chain, url } = data;
//     const request = {
//       type: subscriptionType,
//       attr: {
//         address,
//         chain,
//         url,
//       },
//     };
//     console.log(request);
//     const response = await TatumAxios.post(
//       "/subscription?testnetType=ethereum-sepolia",
//       JSON.stringify(request)
//     );
//     console.log("response", response);
//   } catch (err) {
//     console.error({
//       title: "tatumController - createSubscription",
//       message: err.message,
//     });
//     return null;
//   }
// };

const getNativeData = async (data) => {
  try {
    const { type } = data;
    return NativeData[type.toLowerCase()];
  } catch (err) {
    console.error({
      title: "tatumController - getNativeData",
      message: err.message,
    });
    return "";
  }
};

const createEthereumWallet = async () => {
  try {
    const response = await TatumAxios.get("/ethereum/wallet");
    const { mnemonic, xpub } = response.data;
    return { mnemonic, xpub };
  } catch (err) {
    console.error({
      title: "tatumController - createEthereumAccount",
      message: err.message,
    });
    return null;
  }
};

const createSolanaWallet = async () => {
  try {
    const response = await TatumAxios.get("/solana/wallet");
    const { mnemonic, address, privateKey } = response.data;
    return { mnemonic, address, privateKey };
  } catch (err) {
    console.error({
      title: "tatumController - createEthereumAccount",
      message: err.message,
    });
    return null;
  }
};

const createVirtualAccount = async (data) => {
  try {
    const { xpub, coinType } = data;
    const request = {
      currency: coinType,
      xpub: xpub,
      customer: {
        accountingCurrency: "USD",
        customerCountry: "US",
        externalId: config.TATUM_OPTION[config.NETWORK].virtualAccount,
        providerCountry: "US",
      },
      compliant: true,
      accountCode: config.TATUM_OPTION[config.NETWORK].virtualAccount,
      accountingCurrency: "USD",
      accountNumber: config.TATUM_OPTION[config.NETWORK].virtualAccount,
    };
    const response = await TatumAxios.post(
      "/ledger/account",
      JSON.stringify(request)
    );
    return response.data;
  } catch (err) {
    console.error({
      title: "tatumController - createVirtualAccount",
      message: err.message,
    });
    return null;
  }
};

const getNetworkFromCoinType = (coinType) => {
  if (coinType.toUpperCase() === "BTC") return "bitcoin";
  else if (coinType.toUpperCase() === "ETH") return "ethereum";
  else if (coinType.toUpperCase() === "TRX") return "tron";
  else if (coinType.toUpperCase() === "BNB") return "bsc";
  else if (coinType.toUpperCase() === "SOL") return "solana";
};

const generatePrivateKey = async (data) => {
  try {
    const { mnemonic, index, chain } = data;
    const response = await TatumAxios.post(
      `/${chain}/wallet/priv`,
      JSON.stringify({ index, mnemonic })
    );
    return response.data;
  } catch (err) {
    console.error({
      title: "tatumController - generatePrivateKey",
      message: err.message,
    });
    return "";
  }
};

const getDepositAddressFromAccount = async (data) => {
  try {
    const { coinType } = data;
    const accountInfo = await SettingModel.findOne({
      key: `${coinType}WalletInfo`,
    });
    if (accountInfo) {
      const chain = getNetworkFromCoinType(coinType);
      console.log(accountInfo.dataObject.virtualAccount.id);
      const addressData = await TatumAxios.post(
        `/offchain/account/${accountInfo.dataObject.virtualAccount.id}/address`
      );
      console.log(addressData);
      const privateKey = await generatePrivateKey({
        index: addressData.data.derivationKey,
        chain,
        mnemonic: accountInfo.dataObject.mnemonic,
      });
      return { ...addressData.data, ...privateKey };
    } else {
      console.log({
        title: "tatumController - getDepositAddressFromAccount",
        message: "AccountInfo Null",
      });
      return null;
    }
  } catch (err) {
    console.error({
      title: "tatumController - getDepositAddressFromAccount",
      message: err.message,
    });
    return null;
  }
};

module.exports = {
  createEthereumWallet,
  createSolanaWallet,
  createVirtualAccount,
  getDepositAddressFromAccount,
  getNativeData,
};
