const express = require("express");
const router = express.Router();
// const validateToken = require("../../middleware/auth");
const {
  getCurrentTounaments,
  createNewTournament,
  deleteTournament,
  allocateReward,
} = require("../../controllers/tournaments");

router.get("/", getCurrentTounaments);

router.post("/new", createNewTournament);

router.post("/reward", allocateReward);

router.delete("/:id", deleteTournament);

module.exports = router;
