import { useEffect, useState } from "react";
import { supabase } from "../../supabse/client";
import OrderCard from "../../components/OrderSystem/OrderCard";
import styles from "./KitchenPage.module.scss";

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();

    // Real-time updates when new orders come in or are marked done
    const channel = supabase
      .channel("order_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => fetchOrders()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (!error) setOrders(data || []);
  }

  async function handleMarkAsDone(orderId) {
    await supabase
      .from("orders")
      .update({ status: "done" })
      .eq("id", orderId);

    fetchOrders(); // refresh after marking done
  }

  return (
    <main className={styles.page}>
      <h2 className={styles.heading}>Kitchen Orders</h2>

      {orders.length === 0 ? (
        <p className={styles.empty}>No new orders yet</p>
      ) : (
        <div className={styles.orderList}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onDone={handleMarkAsDone} />
          ))}
        </div>
      )}
    </main>
  );
}
