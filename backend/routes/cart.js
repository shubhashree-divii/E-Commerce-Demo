const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = new express.Router();

//get cart items

router.get("/cart", isAuthenticated, async (req, res) => {
  const owner = req.user._id;

  try {
    const cart = await Cart.findOne({ owner });
    if (cart && cart.products.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send({ message: "Cart Empty" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//add cart
router.post("/cart", isAuthenticated, async (req, res) => {
  const owner = req.user._id;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ owner });
    const item = await Product.findOne({ _id: productId });

    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
    //If cart already exists for user,
    if (cart) {
      const itemIndex = cart.products.findIndex(
        (product) => product.productId == productId
      );
      //check if product exists or not

      if (itemIndex > -1) {
        let product = cart.products[itemIndex];
        product.quantity += quantity;

        cart.products[itemIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.products.push({ productId, quantity });

        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      //no cart exists, create one
      const newCart = await Cart.create({
        owner,
        products: [{ productId, quantity }],
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

//delete item in cart

router.delete("/cart/:productId", isAuthenticated, async (req, res) => {
  const owner = req.user._id;
  const productId = req.params.productId;
  try {
    let cart = await Cart.findOne({ owner });

    const itemIndex = cart.products.findIndex(
      (item) => item.productId == productId
    );

    if (itemIndex > -1) {
      let item = cart.products[itemIndex];

      cart.products.splice(itemIndex, 1);

      cart = await cart.save();

      res.status(200).send(cart);
    } else {
      res.status(404).send("item not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

module.exports = router;
