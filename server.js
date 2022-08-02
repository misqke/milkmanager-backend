const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// routes
const getMilkRouter = require("./routes/milks");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/milks", getMilkRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
