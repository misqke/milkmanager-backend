const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// routes
const getMilkRouter = require("./routes/getMilks");
const submitsRouter = require("./routes/submits");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "https://milkmanager-demo.netlify.app/",
    "https://milkmanager.netlify.app/",
  ],
};

app.use(cors(corsOptions));

app.use("/api/milks", getMilkRouter);
app.use("/api/submits", submitsRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
