const express = require("express");
const product = require("../models/product");
const isAuthenticated = require("../middleware/isAuthenticated");
const isAdmin = require("../middleware/isAdmin");

const router = new express.Router();

//fetch all products
router.get("/products", async (req, res) => {
  try {
    const products = await product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

//fetch an product
router.get("/products/:id", async (req, res) => {
  try {
    console.log(req.params);
    const item = await product.findOne({ _id: req.params.id });
    if (!item) {
      res.status(404).send({ error: "product not found" });
    }
    console.log(item);
    res.status(200).send(item);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//create an product
router.post("/products", isAdmin, async (req, res) => {
  try {
    const newproduct = new product({
      ...req.body,
      created_by: req.user._id,
    });
    await newproduct.save();
    res.status(201).send(newproduct);
  } catch (error) {
    console.log({ error });
    res.status(400).send({ message: error.message });
  }
});

//update an product

router.post("/products/:id", isAdmin, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description", "category", "price","image"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const item = await product.findOne({ _id: req.params.id });

    if (!item) {
      return res.status(404).send();
    }

    updates.forEach((update) => (item[update] = req.body[update]));
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete product
router.delete("/products/:id", isAdmin, async (req, res) => {
  try {
    const deletedproduct = await product.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedproduct) {
      res.status(404).send({ error: "product not found" });
    }
    res.send(deletedproduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
