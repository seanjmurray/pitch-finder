require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const pg = require('pg');
const app = express();
const superagent = require('superagent')
const DB = process.env.DATABASE_URL;
const client = new pg.Client(DB);
client.on('error', err => console.error(err));
client.connect()
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public',express.static("public"));

const eventView = (req,res,next) => {
  let sql = 'SELECT * FROM games LEFT JOIN locations ON games.location = locations.id WHERE games.game_id=$1;';
  let safe = [req.params.id];
  client.query(sql,safe)
    .then(dbData => {
      let sql = 'SELECT * FROM attending LEFT JOIN users ON attending.user_id = users.id WHERE attending.game_id = $1;';
      let safe = [dbData.rows[0].game_id];
      client.query(sql,safe)
        .then(dbData1 => {
          let url = `https://maps.locationiq.com/v2/staticmap?key=${process.env.MAP_API_KEY}&center=${dbData.rows[0].lat},${dbData.rows[0].lon}&zoom=15&size=330x330`;
          res.render('eventDetail', {event: dbData.rows[0],request: req.user.user_id, apiMap: url, userArr: dbData1.rows})
        })
        })
}
module.exports = eventView;