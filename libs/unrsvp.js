'use strict';
require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const methodOverride = require('method-override');
const pg = require('pg');
const app = express();
const DB = process.env.DATABASE_URL;
const client = new pg.Client(DB);
client.on('error', err => console.error(err));
client.connect()
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public', express.static("public"));
app.use(express.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'))

const unrsvp = (req, res, next) => {
  let sql = 'SELECT game_id FROM games WHERE game_id = $1;';
  let safe = [req.params.id];
  client.query(sql, safe)
    .then(dbData => {
      let sql = 'SELECT id FROM users WHERE user_id = $1;';
      let safe = [req.user.user_id]
      client.query(sql, safe)
        .then(dbData1 => {
          let sql = 'DELETE FROM attending WHERE user_id = $1 AND game_id = $2;';
          let safe = [dbData1.rows[0].id, dbData.rows[0].game_id];
          client.query(sql, safe)
            .then(() => {
              res.redirect('/events');
            })
        })
    })
}
module.exports = unrsvp;