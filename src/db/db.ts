import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import os from "os";

const tempDir = os.tmpdir();
const dbPath = path.join(tempDir, "marketplace.db");

const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database,
});

(async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS shopping_cart (
      session_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      product_description TEXT NOT NULL,
      product_price REAL NOT NULL
    )
  `);
})();

export default dbPromise;
