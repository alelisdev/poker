const express = require("express");
const router = express.Router();
// const validateToken = require("../../middleware/auth");
const {
  getCurrentTounaments,
  createNewTournament,
  deleteTournament,
} = require("../../controllers/tournaments");

router.get("/", getCurrentTounaments);

router.post("/new", createNewTournament);

router.delete("/:id", deleteTournament);

module.exports = router;
