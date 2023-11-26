const { INITIAL_CHIPS_AMOUNT } = require("../config");
const User = require("../models/User");
const Tournament = require("../models/Tournaments");

exports.handleFreeChipsRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
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
      const updateUser = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: { balance: { data: newBalance } },
          $push: {
            chipsAmount: {
              name: req.body.tnRegisterName,
              amount: INITIAL_CHIPS_AMOUNT,
            },
          },
        },
        { returnOriginal: false }
      );
      const update = { $push: { registers: user._id } };
      const result = await Tournament.findOneAndUpdate(
        { name: req.body.tnRegisterName },
        update,
        { returnOriginal: false }
      );
      return res.status(200).json({ user: updateUser, tournament: result });
    }
  } catch (err) {
    console.error("POST api/chips/free", err.message);
    return res.status(500).send("Internal server error");
  }
};
