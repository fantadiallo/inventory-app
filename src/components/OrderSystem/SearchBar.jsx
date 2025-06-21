import styles from "./scss/SearchBar.module.scss";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search food or drink..."
      className={styles.searchInput}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
