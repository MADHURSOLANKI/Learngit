// Entry point for the Express server
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = require("./db");
const Product = require("./Product");
connectDB();

// CRUD endpoints for products

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get a single product by id
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Create a new product
app.post("/api/products", async (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null)
    return res.status(400).json({ error: "Name and price required" });
  try {
    const newProduct = new Product({ name, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, price } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { name, price } },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID or data" });
  }
});

// Delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
