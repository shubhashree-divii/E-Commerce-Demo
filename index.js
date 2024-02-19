const express = require("express");
require("./db/mongoose");

const userRouter = require('./routes/user')

const app = express();
app.use(express.json());
app.use(userRouter)

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server listening on port " + port);
});
