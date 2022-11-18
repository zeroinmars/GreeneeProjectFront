const express = require("express");
const bodyParser = require("body-parser");
const router = require('./router/router');
const session = require("express-session");
const mysql_session = require("express-mysql-session");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res)=>{
  console.log("환영합니다.");
  res.send("환영합니다.");
})

const conn = new mysql_session({
  host:"localhost",
  user:"root",
  password:"a246987",
  port:3306,
  database:"lifeconcierge"
})

app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:"smart",
  store:conn
}))

app.use(router);
app.listen(PORT, ()=>{`server is running at : ${PORT}`});