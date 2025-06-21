import styles from "./scss/SelectedItems.module.scss";

export default function SelectedItems({ items, onUpdate, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className={styles.wrapper}>
      <h3>Order Summary</h3>

      {items.length === 0 && <p>No items selected yet.</p>}

      <ul className={styles.itemList}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            <div>
              <strong>{item.name}</strong>
              <p>{item.price} GMD each</p>
            </div>

            <div className={styles.controls}>
              <button onClick={() => onUpdate(index, item.qty - 1)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => onUpdate(index, item.qty + 1)}>+</button>
            </div>

            <button className={styles.remove} onClick={() => onRemove(index)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.total}>
        Total: <strong>{total} GMD</strong>
      </div>
    </div>
  );
}
