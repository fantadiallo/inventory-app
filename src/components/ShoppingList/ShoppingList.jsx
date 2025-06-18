import { useEffect, useState } from "react";
import styles from "./ShoppingList.module.scss";
import { supabase } from "../../supabse/client";

/**
 * ShoppingList Component
 * Auto-generates a list of low-stock items from inventory
 * Displays item name, amount, and optional notes
 * Allows admin to review what needs to be restocked
 * @component
 */
export default function ShoppingList() {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    async function fetchLowStockItems() {
      const { data, error } = await supabase
        .from("inventory")
        .select("id, name, amount, minimum")
        .lt("amount", "minimum");

      if (error) {
        console.error("Error fetching shopping list:", error);
      } else {
        setShoppingItems(data);
      }
    }

    fetchLowStockItems();
  }, []);

  return (
    <section className={styles.shoppingListContainer}>
      <h2>Shopping List</h2>
      {shoppingItems.length === 0 ? (
        <p>All items are sufficiently stocked.</p>
      ) : (
        <ul className={styles.list}>
          {shoppingItems.map((item) => (
            <li key={item.id} className={styles.itemCard}>
              <div>
                <strong>{item.name}</strong>
                <p>
                  Current: {item.amount} | Minimum: {item.minimum}
                </p>
              </div>
              <button
                className={styles.shareBtn}
                onClick={() => {
                  const text = `Restock needed: ${item.name} (Only ${item.amount} left)`;
                  const encoded = encodeURIComponent(text);
                  const whatsappUrl = `https://wa.me/?text=${encoded}`;
                  window.open(whatsappUrl, "_blank");
                }}
              >
                Share on WhatsApp
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
