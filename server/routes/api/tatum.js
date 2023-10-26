const express = require("express");
const { getDepositAddressFromAccount } = require("../../controllers/tatum");
const router = express.Router();

router.post("/depaddress", async (req, res) => {
  const data = await getDepositAddressFromAccount();
  console.log("data", data);
  res.json({ success: true, msg: "ok" });
});

module.exports = router;
