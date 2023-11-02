const express = require("express");
const router = express.Router();
const paymentsController = require("../../controllers/payments");

router.post("/webhook-handler", paymentsController.tatumWebhook);
router.post(
  "/deposit-address",
  paymentsController.getDepositAddressFromAccount
);

router.post("/update-balance", paymentsController.updateBalance);

module.exports = router;
