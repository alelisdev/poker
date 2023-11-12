const express = require("express");
const router = express.Router();
const validateToken = require("../../middleware/auth");
const { handleFreeChipsRequest } = require("../../controllers/chips");

router.post("/free", validateToken, handleFreeChipsRequest);

module.exports = router;
