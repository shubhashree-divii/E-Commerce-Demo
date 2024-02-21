const express = require("express");
const User = require("../models/user");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = new express.Router();

//signup
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({error:error.message});
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({message:"Login Successful", user, token });
  } catch (error) {
    res.status(400).send({error:error.message});
  }
});

router.post('/logout', isAuthenticated, async (req, res) => {
  try {
      req.user.tokens =  req.user.tokens.filter((token) => {
     return token.token !== req.token
    })
      await req.user.save()
      res.send({status:true,message:"Succesfully logged out!!"})
  } catch (error) {
      res.status(500).send({error:error.message})
  }
  })

module.exports = router;
