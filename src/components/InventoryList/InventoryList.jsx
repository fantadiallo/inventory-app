import { useState, useEffect } from "react";
import styles from "./InventoryList.module.scss";
import { supabase } from "../../supabse/client";

export default function InventoryList() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: "", quantity: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase.from("inventory").select("*");
    if (!error) setItems(data);
  }

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData({ name: item.name, quantity: item.quantity });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  async function handleSave(id) {
    const { error } = await supabase
      .from("inventory")
      .update({
        name: formData.name,
        quantity: parseFloat(formData.quantity),
      })
      .eq("id", id);

    if (!error) {
      setEditingItem(null);
      fetchItems();
    }
  }

  return (
    <div className={styles.listContainer}>
      <h2>Inventory List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) =>
            editingItem === item.id ? (
              <tr key={item.id}>
                <td>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </td>
                <td>{item.unit}</td>
                <td>
                  <button onClick={() => handleSave(item.id)}>Save</button>
                </td>
              </tr>
            ) : (
              <tr key={item.id}>
                <td data-label="Name" onClick={() => handleEdit(item)}>
                  {item.name}
                </td>
                <td data-label="Quantity" onClick={() => handleEdit(item)}>
                  {item.quantity}
                </td>
                <td data-label="Unit">{item.unit}</td>
                <td></td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
