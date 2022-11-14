const express = require("express");
const dotenv = require("dotenv");
const morgan  = require("morgan");
const bodyparser  = require("body-parser");
const PATH  = require("path");
const path = require("path");

const connectDB  = require('./server/database/connection');

const app = express(); // here we initialized the express with app

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT || 8080;
// const PORT = process.env.PORT || 8080;
// console.log(process.env.MONGO_URI + "mongo url");


//log request
app.use(morgan("tiny"));

//mongoDB connection
connectDB();

//parse req to body parser
app.use(bodyparser.urlencoded({extended: true}));


//view engine setting
app.set("view engine","ejs");

//load assets
app.use('/css',express.static(PATH.resolve(__dirname,"assets/css")))
app.use('/img',express.static(PATH.resolve(__dirname,"assets/img")))
app.use('/js',express.static(PATH.resolve(__dirname,"assets/js")))

//load routers
app.use("/", require("./server/routes/router"));

app.listen(3000, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
