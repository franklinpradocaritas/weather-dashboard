CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE
);
CREATE TABLE weather_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  city_name VARCHAR(100),
  country_code VARCHAR(2),
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  weather_data JSONB
);
CREATE TABLE favorite_cities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  city_name VARCHAR(100),
  country_code VARCHAR(2),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, city_name, country_code)
);