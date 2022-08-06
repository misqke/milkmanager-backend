require("dotenv").config();
const { submitInventoryScraper, submitOrderScraper } = require("../scrapers");

let confirmation = {};

const runScraper = async (milks, username, password, demo, mode) => {
  const confirmName = demo ? "DEMO" : username;

  confirmation = { ...confirmation, [confirmName]: { message: "", image: "" } };

  if (mode === "inventory") {
    confirmation[confirmName].message = "Submitting Inventory...";
    confirmation[confirmName].image = await submitInventoryScraper(
      milks,
      username,
      password,
      demo
    );
  } else if (mode === "order") {
    confirmation[confirmName].message = "Submitting Order...";
    confirmation[confirmName].image = await submitOrderScraper(
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
  const { username } = req.query;

  res.status(200).json(confirmation[username]);
};

module.exports = { submitInventory, submitOrder, getConfirmation };
