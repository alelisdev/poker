const TournamentsModel = require("../models/Tournaments");

exports.getCurrentTounaments = async (req, res) => {
  const tournaments = await TournamentsModel.find({});
  res.send({ sucess: true, data: tournaments });
};

exports.createNewTournament = async (req, res) => {
  // try {
  const { name, start, end } = req.body;
  console.log(name, start, end);
  const tn = new TournamentsModel({ name, start, end, registers: [] });
  await tn.save();
  res.send({ sucess: true, data: tn });
  // } catch (error) {
  //   return res.status(500).json({ msg: "Internal server error" });
  // }
};

exports.deleteTournament = async (req, res) => {
  try {
    await TournamentsModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ sucess: true });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
