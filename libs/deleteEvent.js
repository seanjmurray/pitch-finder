require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const methodOverride = require('method-override');
const pg = require('pg');
const app = express();
const DB = process.env.DATABASE_URL;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public',express.static("public"));
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'))
const client = new pg.Client(DB);
client.on('error', err => console.error(err));
client.connect()

const deleteEvent = (req, res, next) => {
  let sql = 'DELETE FROM games WHERE game_id = $1;';
  let safe = [req.params.id];
  client.query(sql,safe)
    .then(() => {
      let sql = 'DELETE FROM attending WHERE game_id = $1;';
      let safe = [req.params.id];
      client.query(sql,safe)
        .then(()=>{
          res.redirect('/events')
        })
    })
}
module.exports = deleteEvent;