/*jslint node: true */
'use strict';
require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const app = express();
const pg = require('pg');
const DB = process.env.DATABASE_URL;
const client = new pg.Client(DB);
client.on('error', err => console.error(err));
client.connect();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public', express.static("public"));

const createUser = (req, res, next) => {
  let sql = `INSERT INTO users (user_id,username,avatar) VALUES ($1,$2,$3);`;
  let safe = [
    req.user.user_id,
    req.body.name,
    req.body.avatar
  ];
  client.query(sql, safe)
    .then(() => {
      res.redirect('/events');
    });
};

module.exports = createUser;