require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const superagent = require('superagent')
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public',express.static("public"));

const getEventForm = (req,res,next) => {
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
      res.render('createevent', {locArr: apiData.body})
    })
}

module.exports = getEventForm;