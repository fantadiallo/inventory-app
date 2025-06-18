import { useState, useEffect } from "react";
import styles from "./LogForm.module.scss";
import { supabase } from "../../supabse/client";

/**
 * Allows workers to log how much of each inventory item was used today.
 * Data is saved to `daily_logs` table in Supabase.
 */
export default function LogForm() {
  const [inventory, setInventory] = useState([]);
  const [usage, setUsage] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchInventory() {
      const { data, error } = await supabase.from("inventory").select("*");
      if (error) console.error("Error fetching inventory:", error);
      else setInventory(data);
    }

    fetchInventory();
  }, []);

  const handleChange = (itemId, value) => {
    setUsage((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logs = Object.entries(usage)
      .filter(([_, value]) => value)
      .map(([item_id, quantity_used]) => ({
        item_id,
        quantity_used: parseFloat(quantity_used),
        date: new Date().toISOString().split("T")[0],
      }));

    const { error } = await supabase.from("daily_logs").insert(logs);
    if (error) {
      console.error("Error submitting logs:", error);
      setMessage("Error submitting log.");
    } else {
      setMessage("Stock log submitted successfully!");
      setUsage({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.logForm}>
      <h2>Daily Stock Log</h2>
      {inventory.length === 0 && <p>Loading inventory...</p>}

      {inventory.map((item) => (
        <div key={item.id} className={styles.itemRow}>
          <label htmlFor={`item-${item.id}`}>
            {item.name} (in stock: {item.quantity})
          </label>
          <input
            type="number"
            id={`item-${item.id}`}
            min="0"
            step="0.1"
            value={usage[item.id] || ""}
            onChange={(e) => handleChange(item.id, e.target.value)}
            placeholder="Used today"
          />
        </div>
      ))}

      <button type="submit" className="btn btn-primary mt-3">
        Submit Log
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
