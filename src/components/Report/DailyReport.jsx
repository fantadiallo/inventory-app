import { useEffect, useState } from "react";
import { supabase } from "../../supabse/client";
import styles from "./DailyReport.module.scss";

export default function DailyReport() {
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    fetchOrders();
  }, [date]);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .gte("created_at", `${date}T00:00:00`)
      .lt("created_at", `${date}T23:59:59`)
      .order("created_at");

    if (!error) setOrders(data || []);
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  const itemCounts = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!itemCounts[item.name]) itemCounts[item.name] = 0;
      itemCounts[item.name] += item.qty;
    });
  });

  const bestSellers = Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  function shareReport() {
    const message = `📊 *Daily Report - ${date}*\n\n💰 Revenue: $${totalRevenue.toFixed(
      2
    )}\n🧾 Orders: ${totalOrders}\n⭐ Bestsellers:\n${bestSellers
      .map(([name, qty]) => `- ${name} × ${qty}`)
      .join("\n")}`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/?text=${encoded}`;
    window.open(url, "_blank");
  }

  return (
    <section className={styles.reportWrapper}>
      <h2>📋 Daily Report</h2>

      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>

      <div className={styles.summary}>
        <p>
          <strong>Total Revenue:</strong> ${totalRevenue.toFixed(2)}
        </p>
        <p>
          <strong>Total Orders:</strong> {totalOrders}
        </p>
        <h3>Top 5 Items</h3>
        <ul>
          {bestSellers.map(([name, count]) => (
            <li key={name}>
              {name} × {count}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.actions}>
        <button onClick={shareReport}>📤 Share on WhatsApp</button>
        <button onClick={() => window.print()}>🖨️ Print</button>
      </div>
    </section>
  );
}
