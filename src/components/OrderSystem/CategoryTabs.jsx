import styles from './scss/CategoryTabs.module.scss';

const categories = ["Main", "Drinks", "Sides", "Appetizers", "Extras"];

export default function CategoryTabs({ activeCategory, onChange }) {
  return (
    <div className={styles.tabs}>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.tab} ${activeCategory === cat ? styles.active : ""}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
