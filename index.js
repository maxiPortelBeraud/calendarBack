const express = require("express");
require("dotenv").config();
const { dbConection } = require("./database/config");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

dbConection();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/event", require("./routes/events"));

app.listen(PORT, () => {
  console.log(`Server on in port: http://localhost:${PORT}`);
});
