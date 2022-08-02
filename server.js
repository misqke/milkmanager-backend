const express = require("express");
const cors = require("cors");
const { application } = require("express");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
