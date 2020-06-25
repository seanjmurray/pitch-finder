require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const superagent = require('superagent')
const app = express();
const pg = require('pg');
const DB = process.env.DATABASE_URL;
const client = new pg.Client(DB);
client.on('error', err => console.error(err));
client.connect()
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public',express.static("public"));


const sortDate = (req,res,next) => {
  console.log(req.body.date)
  let sql = 'SELECT * FROM games LEFT JOIN locations ON games.location = locations.id WHERE games.date LIKE $1 ORDER BY time;';
  let safe = [req.body.date];
  client.query(sql,safe)
    .then(dbData => {
      res.render('events', {eventsArr: dbData.rows})
    })
}
module.exports = sortDate;
