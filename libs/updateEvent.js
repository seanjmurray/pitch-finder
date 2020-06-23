require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const pg = require('pg');
const app = express();
const DB = process.env.DATABASE_URL;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public',express.static("public"));
app.use(express.urlencoded({
  extended: true
}));
const client = new pg.Client(DB);
client.on('error', err => console.error(err));
client.connect()

const updateEvent = (req, res, next) => {
    let sql = 'UPDATE games SET time = $1, date = $2, description = $3, players_wanted = $4 WHERE id = $5;';
    let safe =[
      req.body.time,
      req.body.date,
      req.body.description,
      req.body.players_wanted,
      req.params.id
    ];
    client.query(sql, safe)
      .then(()=>{
        res.redirect(`/events/${req.params.id}`);
      })
}
module.exports = updateEvent;