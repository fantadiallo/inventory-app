import { useEffect, useState } from "react";
import OrderForm from "../../components/OrderSystem/OrderForm";
import { supabase } from "../../supabse/client";
import styles from "./OrdersPage.module.scss";

export default function OrdersPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenu() {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("available", true);

      if (!error) setMenuItems(data || []);
    }

    fetchMenu();
  }, []);

  async function handleSubmitOrder(order) {
    const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    const { error } = await supabase.from("orders").insert([
      {
        table_number: parseInt(order.tableNumber),
        items: order.items,
        total,
        status: "pending",
        note: order.note || "",
        created_at: new Date(),
      },
    ]);

    if (error) {
      alert("Failed to submit order");
      console.error(error);
    } else {
      alert("Order submitted!");
    }
  }

  return (
    <main className={styles.pageWrapper}>
      <h2 className={styles.heading}>Place Order</h2>
      <OrderForm menuItems={menuItems} onSubmit={handleSubmitOrder} />
    </main>
  );
}

