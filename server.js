require('dotenv').config();
const express = require("express");
const app = express();

const productModel = require("./products_module");
const product = productModel.Product;

const PORT = 5000;

// add express.json middleware
app.use(express.json());

var cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Friends!");
});

app.get("/products", async (req, res) => {
  let data = await product.find();
  res.send(data);
});

app.get("/products/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await product.find({ _id: req.params.id });
  res.send(data[0]);
});

app.post("/products/add", async (req, res) => {
  console.log(req.body);
  let entry = await product(req.body);
  let result = entry.save();
  console.log("[Data Added]");
  res.send(result);
});

app.post("/update/:id", async (req, res) => {
  console.log(req.body);
  let update_data = await product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        brand: req.body.brand,
        rating: req.body.rating,
        price: req.body.price,
      },
    }
  );
  console.log("[Data Updated]");
  res.send(update_data);
});

app.delete("/:id", async (req, res) => {
  let delete_data = await product.deleteOne({ _id: req.params.id  });
  console.log("[Data Deleted]");
  res.send(delete_data);
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
