![logo](public/images/pfFulllogo.png)


[![HitCount](http://hits.dwyl.com/seanjmurray/pitch-finder.svg)](http://hits.dwyl.com/seanjmurray/pitch-finder)
[![Build Status](https://travis-ci.com/seanjmurray/pitch-finder.svg?branch=master)](https://travis-ci.com/seanjmurray/pitch-finder)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/seanjmurray/pitch-finder/blob/master/LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/seanjmurray/pitch-finder/badge.svg)](https://snyk.io/test/github/seanjmurray/pitch-finder)
[![Version](https://img.shields.io/badge/version-1.5.0-brightgreen.svg)](https://github.com/seanjmurray/pitch-finder)
[![Deployed](https://img.shields.io/badge/deployed-live-brightgreen.svg)](https://pitch-finder.herokuapp.com/)



**Contributors**: Sean Murray, Sarah Shatto, Edgar Romero, Jonathon Lee


**Version**: 1.5.0


**Live**: [Link](https://pitch-finder.herokuapp.com/)


## Overview:
An app designed to connect players with open pickup games around in their local area.

## Getting Started:

### Step 1:
Once you have cloned the repo in the command line run:

```console
$ npm i
$ touch .env
```
### Step 2:
In the directory open the **.env** file and insert the following:

```
PORT=<openport>
DATABASE_URL=db-url
AUTH0_DOMAIN=from-auth0
AUTH0_CLIENT_ID=from-auth0
AUTH0_CLIENT_SECRET=from-auth0
SECRET=express-sessions-secret
PARKS_API_KEY=seattle-parks-API-key
MAP_API_KEY=LocationIQ-API-key
```

**Note** You will need to register with Auth0, Seattle Parks, and LocationIQ.

 - [Autho0](https://auth0.com/)
 - [Seattle Parks](https://data.seattle.gov/Parks-and-Recreation/Seattle-Parks-and-Recreation-Parks-With-Features/j9km-ydkc)
 - [LocationIQ](https://locationiq.com/)

### Step 3:
From the root directory on the command line run the following commands:

```console
$ psql
```
```sql
# CREATE DATABASE dbname;
# \q
```
```console
$ psql -d dbname -f schema.sql
```
### Step 4:
To start the server run the following in the terminal:

```console
$ npm start
```

## Architecture:
App uses node and express to create server and handle http/s requests. OAUTH and express sessions to create and secure logging in and protected routes. EJS is used for rendering of pages and page logic.

### Libraries Used:
 - Express
 - EJS
 - dotenv
 - superagent
 - pg
 - express-sessions
 - passport
 - passport-auth0
 - method-override
 - jquery-modals

## Change Log:

 - 06-19-2020 1600 App now uses OAUTH for user accounts and restricted route access.
 - 06-22-2020 1800 App has ability to create and display events to the user and store them in the DB.
 - 06-25-2020 1800 App has full functionality for the Seattle area, joining and leaving events, profiles, and creating, editing, and deleting events.

 ## Notes

 in auth.js line 58 the concatenation of the 's' will need to be removed in order to logout on http.

 ```js
let returnTo = req.protocol + 's' + "://" + req.hostname;
 ```
 
