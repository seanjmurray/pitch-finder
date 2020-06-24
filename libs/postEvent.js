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
  let sql = 'SELECT id FROM locations WHERE name = $1;';
  let safe =[req.body.location];
  client.query(sql,safe)
    .then(dbData => {
      let sql = 'INSERT INTO games (user_id,location,time,date,skill_level,players_wanted,players_going,description) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING game_id;';
      console.log(req.body);
      let safe = [
        req.user.user_id,
        dbData.rows[0].id,
        req.body.time,
        req.body.date,
        req.body.skill_level,
        req.body.players_wanted,
        0,
        req.body.description
      ];
    
      client.query(sql,safe)
      .then(dbData => {
        res.redirect(`/events/${dbData.rows[0].game_id}`)
      })
    })
    }
module.exports = postEvents;