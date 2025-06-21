import styles from "./FilterDate.module.scss";

export default function FilterDate({ selectedDate, onChange }) {
  return (
    <div className={styles.filterContainer}>
      <label htmlFor="date" className={styles.label}>Select Date:</label>
      <input
        id="date"
        type="date"
        className={styles.dateInput}
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
