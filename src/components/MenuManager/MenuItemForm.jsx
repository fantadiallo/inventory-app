import { useState } from "react";
import styles from "./MenuItemForm.module.scss";

/**
 * Form to add a new menu item (food/drink)
 */
export default function MenuItemForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Main",
    available: true,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price) return alert("Please fill out all fields.");
    onAdd({ ...form, price: parseInt(form.price) });
    setForm({ name: "", price: "", category: "Main", available: true });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Add Menu Item</h3>

      <input
        name="name"
        placeholder="Item name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <select name="category" value={form.category} onChange={handleChange}>
        <option>Main</option>
        <option>Drinks</option>
        <option>Sides</option>
        <option>Appetizers</option>
        <option>Extras</option>
      </select>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="available"
          checked={form.available}
          onChange={handleChange}
        />
        Available
      </label>

      <button type="submit">Add Item</button>
    </form>
  );
}
