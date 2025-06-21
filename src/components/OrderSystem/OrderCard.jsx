import styles from "./scss/OrderCard.module.scss";

/**
 * Displays a single order
 * Props:
 * - order: { table_number, items, note, total }
 * - onDone (optional): function to call when "Done" button is pressed
 */
export default function OrderCard({ order, onDone }) {
  const total = order.items?.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>Table {order.table_number}</h3>
        <span className={styles.total}>{total} GMD</span>
      </div>

      <ul className={styles.items}>
        {order.items.map((item, idx) => (
          <li key={idx}>
            {item.name} × {item.qty}
          </li>
        ))}
      </ul>

      {order.note && <p className={styles.note}>Note: {order.note}</p>}

      {onDone && (
        <button className={styles.doneBtn} onClick={() => onDone(order.id)}>
          Mark as Done
        </button>
      )}
    </div>
  );
}
