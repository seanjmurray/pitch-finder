require("dotenv").config();
const express = require("express");
const path = require("path");
require('ejs');
const pg = require('pg');
const superagent = require('superagent')
const expressSession = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
//modules
const authRouter = require('./libs/auth');
const getHome = require('./libs/getHome');
const getEventForm = require('./libs/createEvent');
const postEvents = require("./libs/postEvent");
const eventView = require('./libs/eventView');

const DB = process.env.DATABASE_URL;
const client = new pg.Client(DB);
client.on('error', err => console.error(err));

const app = express();
const port = process.env.PORT || 8080;
//express-session
const session = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false
};
// sets up passport strategy for login
const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);
//views and rendering
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/public',express.static("public"));
app.use(express.urlencoded({
  extended: true
}));
//session tracking
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
// adds the middleware to res obj
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use("/", authRouter);

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
};
///////Routes//////////
app.get('/', (req,res) => {
  res.render('home');
})
app.route('/events')
  .get(secured, getHome)
app.route('/new/event')
  .get(secured,getEventForm)
  .post(secured,postEvents)
app.route('/events/:id')
  .get(secured,eventView)


  client.connect()
    .then(() => {
      app.listen(port, ()=> console.log(`Listening on ${port}`))
    })


