const express = require("express");

const {
  submitInventory,
  submitOrder,
  getConfirmation,
} = require("../controllers/submits");

const router = express.Router();

router.route("/inventory").post(submitInventory);
router.route("/order").post(submitOrder);
router.route("/confirmation").get(getConfirmation);

module.exports = router;
