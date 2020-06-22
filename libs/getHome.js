require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const pg = require('pg');
const app = express();
const DB = process.env.DATABASE_URL;
const client = new pg.Client(DB);
client.on('error', err => console.error(err));
client.connect()
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public',express.static("public"));

const getHome = (req,res,next) => {
  let sql = 'SELECT * FROM games;';
  client.query(sql)
    .then(dbData => {
      let today = new Date();
      today = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
      let eventsArr = dbData.rows.filter(obj => obj.date < today ? false : true);
      res.render('events', {eventsArr: eventsArr})
      })
    }
module.export = getHome;