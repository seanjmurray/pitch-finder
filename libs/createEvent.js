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
app.use('/public',express.static("public"));

const getEventForm = (req,res,next) => {
  let sql = 'SELECT * FROM locations;';
  client.query(sql)
    .then(dbData => {
      if(dbData.rowCount !== 0){
        res.render('createEvent', {locArr: dbData.rows})
      }else{
        let url = 'https://data.seattle.gov/resource/j9km-ydkc.json';
        let head = {
          $$app_token: process.env.PARKS_API_KEY
        }
        let query = {
          feature_desc: 'Soccer'
        }
        superagent.get(url)
        .set(head)
        .query(query)
        .then(apiData => {
          res.render('createEvent', {locArr: apiData.body})
          apiData.body.forEach(obj => {
            let sql = `INSERT INTO locations (name, lat, lon) VALUES ($1,$2,$3);`;
            let safe = [obj.name,obj.ypos,obj.xpos]
            client.query(sql,safe)
              .then().catch(err => console.log(err)) 
          })
        })
      }
    })
}

module.exports = getEventForm;

