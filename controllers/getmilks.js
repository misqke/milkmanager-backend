const { scrapeMilk } = require("../scrapers");

const getMilkData = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "username and password required" });
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
