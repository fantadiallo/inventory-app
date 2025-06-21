import { useEffect, useState } from "react";
import { supabase } from "../../supabse/client";
import MenuItemForm from "../../components/MenuManager/MenuItemForm";
import MenuTable from "../../components/MenuManager/MenuTable";
import styles from "./MenuManagerPage.module.scss";

/**
 * Page for admin to manage menu items.
 */
export default function MenuManagerPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data, error } = await supabase.from("menu_items").select("*");
    if (!error) setItems(data || []);
  }

  async function handleAdd(item) {
    const { error } = await supabase.from("menu_items").insert([item]);
    if (!error) fetchItems();
  }

  async function handleToggle(item) {
    const { error } = await supabase
      .from("menu_items")
      .update({ available: !item.available })
      .eq("id", item.id);
    if (!error) fetchItems();
  }

  async function handleDelete(id) {
    const confirm = window.confirm("Delete this menu item?");
    if (!confirm) return;
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    if (!error) fetchItems();
  }

  return (
    <main className={`container py-4 ${styles.page}`}>
      <h2>Manage Menu</h2>
      <MenuItemForm onAdd={handleAdd} />
      <MenuTable items={items} onToggle={handleToggle} onDelete={handleDelete} />
    </main>
  );
}
