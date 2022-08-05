require("dotenv").config();
const { scrapeMilk } = require("../scrapers");

const getMilkData = async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
  }

  if (username === "DEMO" && password === "demo") {
    username = process.env.DEANS_USERNAME;
    password = process.env.DEANS_PASSWORD;
  }

  try {
    const data = await scrapeMilk(username, password);
    if (data.error) {
      return res.status(400).json({ error: data.error });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = { getMilkData };
