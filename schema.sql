DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(40),
  location VARCHAR(255),
  time TIME(HH:MM),
  date DATE,
  skill_level VARCHAR(12),
  num_players SMALLINT,
  description VARCHAR(255)
);

