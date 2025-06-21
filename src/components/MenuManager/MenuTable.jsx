import styles from "./MenuTable.module.scss";

/**
 * Table to view/edit/delete menu items
 */
export default function MenuTable({ items = [], onToggle, onDelete }) {
  if (items.length === 0) {
    return <p className={styles.empty}>No items in the menu yet.</p>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Available</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price} D</td>
            <td>{item.category}</td>
            <td>
              <input
                type="checkbox"
                checked={item.available}
                onChange={() => onToggle(item)}
              />
            </td>
            <td>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
