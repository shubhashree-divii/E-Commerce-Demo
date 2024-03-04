const express = require("express");
var cors = require('cors')

require("./db/mongoose");


const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')

const app = express();
app.use(cors())
app.use(express.json());
app.use(userRouter)
app.use(productRouter)
app.use(cartRouter)

const port = process.env.PORT || 3001;

app.listen(3001, () => {
  console.log("server listening on port " + port);
});
