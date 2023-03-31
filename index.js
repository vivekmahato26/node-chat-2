const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const messageRouter = require("./routes/messageRouter");
const userRouter = require("./routes/userRouter");

const { json, urlencoded } = express;

const app = express();



app.use(
  cors()
  //     {
  //     origin: "https://codingschool.com"
  // }
);

app.use(json());
app.use(urlencoded({ extended: true }));
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-shard-00-00.ogjsn.mongodb.net:27017,cluster0-shard-00-01.ogjsn.mongodb.net:27017,cluster0-shard-00-02.ogjsn.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
);

app.use("/users",userRouter);
app.use("/messages",messageRouter);

app.listen(4000, () => {
  console.log("server listening at port 4000");
});
