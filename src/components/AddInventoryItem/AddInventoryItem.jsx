import { useState } from "react";
import { supabase } from "../../supabse/client";
import styles from "./AddInventoryItem.module.scss";

export default function AddInventoryItem() {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "",
    threshold: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("inventory_items").insert([form]);

    if (error) {
      alert("Error adding item");
      console.error(error);
    } else {
      alert("Item added!");
      setForm({ name: "", quantity: "", unit: "", threshold: "" });
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h4 className={styles.heading}>Add Inventory Item</h4>

        <div className={styles.field}>
          <input
            name="name"
            placeholder="Item name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <input
            name="unit"
            placeholder="Unit (e.g. kg, pcs)"
            value={form.unit}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <input
            name="threshold"
            type="number"
            placeholder="Low stock limit"
            value={form.threshold}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <button className={styles.button} type="submit">Add Item</button>
      </form>
    </div>
  );
}
