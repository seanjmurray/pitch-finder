# pitch-finder

**Author**: Sean Murray, Sarah Shatto, Edgar Romero, Jonathon Lee
**Version**: 1.0.0

## Overview
An app designed to connect players with open pickup games around them.

## Getting Started

### Step 1:
Once you have cloned the repo in the command line run:

```console
$ npm i
$ touch .env
```
### Step 2:
In the directory open the **.env** file and insert the following:
 - openport should be a number for an open port on your machine.
```
PORT=<openport>
DATABASE=db-url
```

### Step 3:
From the root directory on the command like run the following commands:

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

## Architecture


### Libraries Used:
 - Express
 - EJS
 - dotenv
 - superagent
 - pg
 - express-sessions
 - passport
 - passport-auth0

## Change Log
