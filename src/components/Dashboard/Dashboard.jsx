import { useEffect, useState } from "react";
import styles from "./Dashboard.module.scss";
import { supabase } from "../../supabse/client";

/**
 * Dashboard component
 * Displays total inventory items, today's used items, and low stock alerts.
 */
export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    setLoading(true);
    const { data, error } = await supabase.from("inventory_items").select("*");

    if (error) {
      setError("Failed to load inventory.");
    } else {
      setItems(data);
    }

    setLoading(false);
  }

  const totalItems = items.length;

  const lowStockItems = items.filter(
    (item) => item.quantity <= item.threshold
  );

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.title}>Inventory Overview</h2>

      {loading && <p>Loading inventory...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <div className={styles.stats}>
            <div className={styles.statBox}>
              <h3>Total Items</h3>
              <p>{totalItems}</p>
            </div>

            <div className={styles.statBox}>
              <h3>Low Stock</h3>
              <p>{lowStockItems.length}</p>
            </div>
          </div>

          {lowStockItems.length > 0 && (
            <div className={styles.lowStockList}>
              <h4>Low Stock Items</h4>
              <ul>
                {lowStockItems.map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} {item.unit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
