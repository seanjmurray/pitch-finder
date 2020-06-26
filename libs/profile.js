'use strict';
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
app.use('/public', express.static("public"));


const profile = (req, res, next) => {
  let sql = 'SELECT * FROM games LEFT JOIN locations ON games.location = locations.id LEFT JOIN attending ON attending.game_id = games.game_id LEFT JOIN users ON users.id = attending.user_id WHERE users.user_id = $1 ORDER BY date;';
  let safe = [req.user.user_id];
  client.query(sql, safe)
    .then(dbData => {
      res.render('profile', {
        eventsArr: dbData.rows
      })
    })
}
module.exports = profile;