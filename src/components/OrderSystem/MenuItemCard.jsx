import styles from './scss/MenuItemCard.module.scss';

/**
 * Tappable card for selecting food or drink items
 * @param {Object} props - item (name, price), onSelect()
 */
export default function MenuItemCard({ item, onSelect }) {
  return (
    <button
      className={styles.card}
      onClick={() => onSelect(item)}
    >
      <div className={styles.name}>{item.name}</div>
      <div className={styles.price}>{item.price} GMD</div>
    </button>
  );
}
