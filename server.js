require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const getMilkRouter = require("./routes/getMilks");
const submitsRouter = require("./routes/submits");

app.use(
  cors({
    origin: [
      "https://milkmanager.netlify.app",
      "https://milkmanager-demo.netlify.app",
      "http://localhost:3000",
    ],
  })
);
// app.use(cors("*"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/start", (req, res) => res.status(200).json(true));
app.use("/api/milks", getMilkRouter);
app.use("/api/submits", submitsRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
