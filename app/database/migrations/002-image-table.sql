--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE image (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  filePath TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE image;