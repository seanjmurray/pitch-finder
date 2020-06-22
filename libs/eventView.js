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

const eventView = (req,res,next) => {
  let sql = 'SELECT * FROM games WHERE id=$1;';
  let safe = [req.params.id];
  client.query(sql,safe)
    .then(dbData => {
      res.render('eventDetail', {event: dbData.rows[0]})
    })
}
module.exports = eventView;