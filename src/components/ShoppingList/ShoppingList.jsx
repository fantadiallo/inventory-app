import { useEffect, useState } from "react";
import styles from "./ShoppingList.module.scss";
import { supabase } from "../../supabse/client";

/**
 * ShoppingList Component
 * Auto-generates a list of low-stock items from inventory
 * Displays item name, amount, and optional notes
 * Allows admin to review what needs to be restocked and share the list
 */
export default function ShoppingList() {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [notes, setNotes] = useState({});

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

  function getListText() {
    return shoppingItems
      .map(
        (item) =>
          `• ${item.name} — Only ${item.amount} left (Min: ${item.minimum})` +
          (notes[item.id] ? `. Note: ${notes[item.id]}` : "")
      )
      .join("\n");
  }

  return (
    <section className={styles.shoppingListContainer}>
      <h2>Shopping List</h2>

      {shoppingItems.length === 0 ? (
        <p>All items are sufficiently stocked.</p>
      ) : (
        <>
          <div className={styles.buttonRow}>
            <button
              className={styles.shareAll}
              onClick={() => {
                const text = getListText();
                const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                window.open(waUrl, "_blank");
              }}
            >
              Share All on WhatsApp
            </button>

            <button
              className={styles.copyBtn}
              onClick={() => {
                navigator.clipboard.writeText(getListText());
                alert("Shopping list copied to clipboard!");
              }}
            >
              Copy Full List
            </button>
          </div>

          <ul className={styles.list}>
            {shoppingItems.map((item) => (
              <li key={item.id} className={styles.itemCard}>
                <div>
                  <strong>{item.name}</strong>
                  <p>
                    Current: {item.amount} | Minimum: {item.minimum}
                  </p>
                  <input
                    type="text"
                    placeholder="Optional note"
                    value={notes[item.id] || ""}
                    onChange={(e) =>
                      setNotes((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                    className={styles.noteInput}
                  />
                </div>

                <button
                  className={styles.shareBtn}
                  onClick={() => {
                    const note = notes[item.id]
                      ? `. Note: ${notes[item.id]}`
                      : "";
                    const text = `Restock needed: ${item.name} (Only ${item.amount} left)${note}`;
                    const waUrl = `https://wa.me/?text=${encodeURIComponent(
                      text
                    )}`;
                    window.open(waUrl, "_blank");
                  }}
                >
                  Share on WhatsApp
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
