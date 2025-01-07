--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE user (
  id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE user;

DROP TABLE project;