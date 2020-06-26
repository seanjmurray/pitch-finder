/*jslint node: true */
'use strict';
require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const pg = require('pg');
const app = express();
const DB = process.env.DATABASE_URL;
const client = new pg.Client(DB);
client.on('error', err => console.error(err));
client.connect();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public', express.static("public"));

const getHome = (req, res, next) => {
  let sql = 'SELECT * FROM games LEFT JOIN locations ON games.location = locations.id ORDER BY date;';
  client.query(sql)
    .then(dbData => {
      res.render('events', {
        eventsArr: dbData.rows
      });
    });
};
module.exports = getHome;