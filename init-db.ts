// scripts/init-db.ts
import client from './db';

async function initDb() {
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS lists (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      list_id INTEGER NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
      category_id INTEGER NOT NULL REFERENCES categories(id),
      name VARCHAR(255) NOT NULL,
      quantity INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id SERIAL PRIMARY KEY,
      list_id INTEGER NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const seedDataQuery = `
    INSERT INTO categories (name) VALUES
    ('Fruits'),
    ('Vegetables'),
    ('Dairy'),
    ('Bakery'),
    ('Meat'),
    ('Seafood'),
    ('Beverages'),
    ('Snacks'),
    ('Frozen Foods'),
    ('Pantry Items')
    ON CONFLICT (name) DO NOTHING;

    INSERT INTO lists (name) VALUES
    ('Weekly Groceries'),
    ('Party Supplies'),
    ('BBQ Essentials'),
    ('Camping Trip'),
    ('Holiday Feast'),
    ('Healthy Eating'),
    ('Kids Snacks'),
    ('Office Supplies'),
    ('Pet Food'),
    ('Emergency Kit')
    ON CONFLICT (name) DO NOTHING;

    INSERT INTO items (list_id, category_id, name, quantity) VALUES
    (1, 1, 'Apples', 5),
    (1, 2, 'Carrots', 10),
    (2, 4, 'Bread', 2),
    (2, 5, 'Chicken Wings', 20),
    (3, 3, 'Milk', 3),
    (3, 6, 'Shrimps', 15),
    (4, 7, 'Juice', 6),
    (4, 8, 'Chips', 10),
    (5, 9, 'Ice Cream', 4),
    (5, 10, 'Pasta', 2)
    ON CONFLICT DO NOTHING;

    INSERT INTO favorites (list_id) VALUES
    (1),
    (2),
    (3),
    (4),
    (5),
    (6),
    (7),
    (8),
    (9),
    (10)
    ON CONFLICT DO NOTHING;
  `;

  try {
    await client.connect();
    await client.query(createTablesQuery);
    await client.query(seedDataQuery);
    console.log('Database initialized and seeded successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await client.end();
  }
}

initDb();
