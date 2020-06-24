DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  lat DECIMAL(12,8),
  lon DECIMAL(12,8)
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(40),
  username VARCHAR(20),
  avatar VARCHAR(4)
);

DROP TABLE IF EXISTS games;

CREATE TABLE games (
  game_id SERIAL PRIMARY KEY,
  user_id VARCHAR(40),
  location INTEGER REFERENCES locations(id),
  time TIME,
  date DATE,
  skill_level VARCHAR(12),
  players_wanted SMALLINT,
  players_going SMALLINT,
  description VARCHAR(255)
);


-- DROP TABLE IF EXISTS attending;

-- CREATE TABLE attending (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id),
--   game_id INTEGER REFERENCES games(id)
-- );