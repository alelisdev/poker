const TournamentsModel = require("../models/Tournaments");
const User = require("../models/User");

exports.getCurrentTounaments = async (req, res) => {
  const tournaments = await TournamentsModel.find({});
  res.send({ sucess: true, data: tournaments });
};

exports.allocateReward = async (req, res) => {
  try {
    const tournament = await TournamentsModel.findById(req.body.id);
    const contesters = [];
    await Promise.all(
      tournament.registers.map(async (id) => {
        const user = await User.findById(id);
        const chips = user.chipsAmount.filter(
          (item) => (item.name = tournament.name)
        )[0].amount;
        const data = {
          userId: user._id,
          chips: chips,
        };
        contesters.push(data);
      })
    );
    const ethPrice = 2032.22;
    contesters.sort((a, b) => b.chips - a.chips);
    const contesterCnt = contesters.length;
    const totalPrice = (10 * contesterCnt) / ethPrice;
    let reward = 0;
    contesters.map(async (contester, index) => {
      if (index === 0) {
        reward = totalPrice * 0.5;
      } else if (index === 1) {
        reward = totalPrice * 0.25;
      } else if (index === 2) {
        reward = totalPrice * 0.15;
      } else if (index === 3) {
        reward = totalPrice * 0.1;
      } else {
        reward = 0;
      }
      const user = await User.findById(contester.userId).select("-password");
      const coinType = "ETH";
      let balanceData = user.balance.data.find(
        (data) => data.coinType === coinType
      );
      balanceData.balance += reward;
      const newBalance = user.balance.data.map((bal) => {
        if (bal.coinType === coinType) return balanceData;
        else return bal;
      });

      const updateUser = await User.findOneAndUpdate(
        { _id: contester.userId },
        {
          $set: { balance: { data: newBalance } },
          $pull: {
            chipsAmount: {
              name: tournament.name,
            },
          },
        },
        { returnOriginal: false }
      );
    });
    res.send({ sucess: true });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.createNewTournament = async (req, res) => {
  try {
    const { name, start, end } = req.body;
    const tn = new TournamentsModel({ name, start, end, registers: [] });
    await tn.save();
    res.send({ sucess: true, data: tn });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.deleteTournament = async (req, res) => {
  try {
    await TournamentsModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ sucess: true });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
