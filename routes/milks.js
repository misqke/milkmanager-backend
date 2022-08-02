const express = require("express");
const router = express.Router();

const { getMilkData } = require("../controllers/getmilks");

router.route("/").post(getMilkData);

module.exports = router;
