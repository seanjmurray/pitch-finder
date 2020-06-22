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

const postEvents = (req,res,next) => {
  let sql = 'INSERT INTO games (user_id,location,time,date,skill_level,players_wanted,description) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id;';
  let safe = [
    req.user.user_id,
    req.body.location,
    req.body.time,
    req.body.date,
    req.body.skill_level,
    req.body.players_wanted,
    req.body.description
  ];
  
  client.query(sql,safe)
    .then(dbData => {
      res.redirect(`/events/${dbData.rows[0].id}`)
    })
}
module.exports = postEvents;