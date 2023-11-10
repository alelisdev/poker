const { INITIAL_CHIPS_AMOUNT } = require("../config");
const User = require("../models/User");

// @route   GET api/chips/free
// @desc    Get free chips if user has zero chips left
// @access  Private
exports.handleFreeChipsRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user.chipsAmount <= 0) {
      const coinType = "ETH";
      let balanceData = user.balance.data.find(
        (data) => data.coinType === coinType
      );
      balanceData.balance -= 0.014;
      if (balanceData.balance < 0.014) {
        return res.status(200).json({ errors: "not enough balance." });
      } else {
        const newBalance = user.balance.data.map((bal) => {
          if (bal.coinType === coinType) return balanceData;
          else return bal;
        });
        await User.findOneAndUpdate(
          { _id: req.user.id },
          { balance: { data: newBalance } }
        );
        user.chipsAmount += INITIAL_CHIPS_AMOUNT;
        await user.save();
      }
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ errors: [{ msg: "Invalid request" }] });
    }
  } catch (err) {
    console.error("GET api/chips/free", err.message);
    return res.status(500).send("Internal server error");
  }
};
