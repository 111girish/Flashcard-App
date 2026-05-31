CREATE TABLE users(
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL, 
  password VARCHAR(255) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone_no VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(), 
  user_id SERIAL PRIMARY KEY
);

CREATE TABLE decks(
  deck_id SERIAL PRIMARY KEY,
  subject TEXT NOT NULL,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE cards(
  card_id SERIAL PRIMARY KEY,
  front_text TEXT NOT NULL,
  back_text TEXT NOT NULL,
  ease_factor DECIMAL(4,2) NOT NULL DEFAULT 2.5,
  interval INT NOT NULL DEFAULT 1,
  repetitions INT NOT NULL DEFAULT 0,
  next_review_date DATE NOT NULL DEFAULT CURRENT_DATE,
  deck_id INT NOT NULL REFERENCES decks(deck_id) ON DELETE CASCADE
);