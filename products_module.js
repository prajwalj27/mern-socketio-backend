require('dotenv').config();
const mongoose = require("mongoose");

const Db = process.env.ATLAS_URI;

// Step 1 - Connect to database
const connString = Db;
mongoose
  .connect(connString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

// Step 2 - Create Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

// Step 3 - Create guests Collection model
const productObject = new mongoose.model("products", productSchema);

exports.Product = productObject;
