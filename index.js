const express = require("express");
require("./db/mongoose");


const userRouter = require('./routes/user')
const productRouter = require('./routes/product')

const app = express();
app.use(express.json());
app.use(userRouter)
app.use(productRouter)

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server listening on port " + port);
});
