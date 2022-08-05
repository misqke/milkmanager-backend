require("dotenv").config();
const { submitInventoryScraper, submitOrderScraper } = require("../scrapers");

let confirmation = { message: "", image: "" };

const runScraper = async (milks, username, password, demo, mode) => {
  if (mode === "inventory") {
    confirmation.message = "Submitting inventory...";
    confirmation.image = await submitInventoryScraper(
      milks,
      username,
      password,
      demo
    );
  } else if (mode === "order") {
    confirmation.message = "Submitting order...";
    confirmation.image = await submitOrderScraper(
      milks,
      username,
      password,
      demo
    );
  }
};

const submitInventory = async (req, res) => {
  const milks = req.body.milks;
  const demo = req.body.demo || false;
  const username = demo ? process.env.DEANS_USERNAME : req.body.username;
  const password = demo ? process.env.DEANS_PASSWORD : req.body.password;
  runScraper(milks, username, password, demo, "inventory");

  res.status(201).json({ message: "Submitting inventory..." });
};

const submitOrder = async (req, res) => {
  const milks = req.body.milks;
  const demo = req.body.demo || false;
  const username = demo ? process.env.DEANS_USERNAME : req.body.username;
  const password = demo ? process.env.DEANS_PASSWORD : req.body.password;
  runScraper(milks, username, password, demo, "order");

  res.status(201).json({ message: "Submitting order..." });
};

const getConfirmation = async (req, res) => {
  if (confirmation.image.length > 0) {
    setTimeout(() => {
      confirmation = { message: "", image: "" };
    }, 10000);
  }
  res.status(200).json(confirmation);
};

module.exports = { submitInventory, submitOrder, getConfirmation };
