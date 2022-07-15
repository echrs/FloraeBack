const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "build")));

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("Connected."))
  .catch((err) => console.log(err));

app.use('/task', require('./routes/task'));
app.use("/user", require("./routes/user"));
app.use('/plant', require('./routes/plant'));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
