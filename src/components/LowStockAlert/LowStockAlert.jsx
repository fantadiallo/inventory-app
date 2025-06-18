import { useEffect, useState } from "react";
import styles from "./LowStockAlert.module.scss";
import { supabase } from "../../supabse/client";

/**
 * Displays a list of inventory items that are low in stock.
 * @component
 */
export default function LowStockAlert() {
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    async function fetchLowStock() {
      const { data, error } = await supabase
        .from("inventory")
        .select("*");

      if (error) {
        console.error("Error fetching inventory:", error);
      } else {
        const lowItems = data.filter(item => item.quantity < item.threshold);
        setLowStockItems(lowItems);
      }
    }

    fetchLowStock();
  }, []);

  return (
    <section className={styles.alertSection}>
      <h2 className={styles.heading}>⚠️ Low Stock Alerts</h2>
      {lowStockItems.length === 0 ? (
        <p className={styles.message}>All items are sufficiently stocked.</p>
      ) : (
        <ul className={styles.alertList}>
          {lowStockItems.map(item => (
            <li key={item.id} className={styles.alertItem}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.qty}>Only {item.quantity} left</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
