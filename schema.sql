DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(40),
  location VARCHAR(255),
  time TIME,
  date DATE,
  skill_level VARCHAR(12),
  players_wanted SMALLINT,
  players_going SMALLINT,
  description VARCHAR(255)
);

