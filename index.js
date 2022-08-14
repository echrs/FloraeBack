const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("Connected."))
  .catch((err) => console.log(err));

app.use("/users", require("./routes/user"));
app.use('/plants', require('./routes/plant'));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
