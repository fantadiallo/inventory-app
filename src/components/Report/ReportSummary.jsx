import styles from "./ReportSummary.module.scss";

export default function ReportSummary({ orders }) {
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
    .slice(0, 3);

  return (
    <section className={styles.summarySection}>
      <h3>Daily Summary</h3>
      <p><strong>Total Revenue:</strong> ${totalRevenue.toFixed(2)}</p>
      <p><strong>Total Orders:</strong> {totalOrders}</p>
      <p><strong>Top Items:</strong></p>
      <ul>
        {bestSellers.map(([name, count]) => (
          <li key={name}>{name} × {count}</li>
        ))}
      </ul>
    </section>
  );
}
