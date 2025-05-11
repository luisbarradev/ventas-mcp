import dbPromise from "../db/db.js";

export class CartService {
  public async addToCart(
    sessionId: string,
    products: { id: string; name: string; description: string; price: number }[]
  ): Promise<boolean> {
    const db = await dbPromise;
    const insertStmt = await db.prepare(
      "INSERT OR REPLACE INTO shopping_cart (session_id, product_id, product_name, product_description, product_price) VALUES (?, ?, ?, ?, ?)"
    );

    try {
      for (const product of products) {
        await insertStmt.run(
          sessionId,
          product.id,
          product.name,
          product.description,
          product.price
        );
      }
      await insertStmt.finalize();
      return true;
    } catch (err) {
      console.error("Error inserting into shopping_cart:", err);
      return false;
    }
  }

  public async viewCart(sessionId: string): Promise<
    {
      product_id: string;
      product_name: string;
      product_description: string;
      product_price: number;
    }[]
  > {
    const db = await dbPromise;
    const rows = await db.all<
      {
        product_id: string;
        product_name: string;
        product_description: string;
        product_price: number;
      }[]
    >(
      "SELECT product_id, product_name, product_description, product_price FROM shopping_cart WHERE session_id = ?",
      sessionId
    );

    return rows;
  }

  public async removeFromCartById(
    sessionId: string,
    productId: string
  ): Promise<boolean> {
    const db = await dbPromise;
    const deleteStmt = await db.prepare(
      "DELETE FROM shopping_cart WHERE session_id = ? AND product_id = ?"
    );

    try {
      const result = await deleteStmt.run(sessionId, productId);
      await deleteStmt.finalize();
      return (result.changes ?? 0) > 0;
    } catch (err) {
      console.error("Error removing product from shopping_cart:", err);
      return false;
    }
  }

  public async removeAllFromCart(sessionId: string): Promise<boolean> {
    const db = await dbPromise;
    const deleteStmt = await db.prepare(
      "DELETE FROM shopping_cart WHERE session_id = ?"
    );

    try {
      const result = await deleteStmt.run(sessionId);
      await deleteStmt.finalize();
      return (result.changes ?? 0) > 0;
    } catch (err) {
      console.error("Error removing all products from shopping_cart:", err);
      return false;
    }
  }
}
