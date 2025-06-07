-- data_seed.sql
-- 1) Poblamos la tabla "users"
INSERT INTO
  users (username)
VALUES
  ('alice'),
  ('bob'),
  ('carlos');
-- 2) Poblamos "weather_history" para cada usuario
  -- Nota: weather_data es JSONB; aquí simulamos un par de campos típicos
INSERT INTO
  weather_history (user_id, city_name, country_code, weather_data)
VALUES
  (
    1,
    'Lima',
    'PE',
    '{
       "temperature": 20.5,
       "description": "clear sky",
       "humidity": 60
     }'
  ),
  (
    1,
    'Cusco',
    'PE',
    '{
       "temperature": 15.2,
       "description": "partly cloudy",
       "humidity": 55
     }'
  ),
  (
    2,
    'Madrid',
    'ES',
    '{
       "temperature": 22.0,
       "description": "sunny",
       "humidity": 30
     }'
  ),
  (
    3,
    'New York',
    'US',
    '{
       "temperature": 18.7,
       "description": "rainy",
       "humidity": 80
     }'
  );
-- 3) Poblamos "favorite_cities" indicando ciudades favoritas por usuario
INSERT INTO
  favorite_cities (user_id, city_name, country_code)
VALUES
  (1, 'Arequipa', 'PE'),
  (1, 'Piura', 'PE'),
  (2, 'Barcelona', 'ES'),
  (3, 'Miami', 'US'),
  (3, 'Lima', 'PE');