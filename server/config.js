const dotenv = require("dotenv");

// Load env vars if env is not production
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./server/config/local.env" });
}

module.exports = {
  PORT: process.env.PORT || 8080,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  INITIAL_CHIPS_AMOUNT: 3000,
  JWT_TOKEN_EXPIRES_IN: 3600000 * 24,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PW: process.env.SMTP_PW,
  FROM_NAME: "Poker Info",
  FROM_EMAIL: "no-reply@testpoker.net",
  NETWORK: "testnet",
  TATUM_OPTION: {
    testnet: {
      apikey: "e15e3429-6588-4cd4-8c83-cf0dad778ecc",
      virtualAccount: "PlayHJPaymentTestnet",
      withdrawFee: "0.00001",
    },
    mainnet: {
      apikey: "e15e3429-6588-4cd4-8c83-cf0dad778ecc",
      virtualAccount: "PlayHJPaymentMainnet",
      withdrawFee: "0.00001",
    },
  },
  SUBSCRIBE_URL: "http://185.190.140.99:5000/api/payments/webhook-handler",
  DEV_MDOE: true,
};
