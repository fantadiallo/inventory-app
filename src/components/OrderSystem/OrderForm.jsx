import SearchBar from "./SearchBar";
import CategoryTabs from "./CategoryTabs";
import styles from "./scss/OrderForm.module.scss";
import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import SelectedItems from "./SelectedItems";

export default function OrderForm({ menuItems = [], onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Main");
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableNumber, setTableNumber] = useState("");

  const filteredItems = menuItems
    .filter((item) => item.category === activeCategory)
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  function handleSelect(item) {
    const existing = selectedItems.find((i) => i.name === item.name);
    if (existing) {
      const updated = selectedItems.map((i) =>
        i.name === item.name ? { ...i, qty: i.qty + 1 } : i
      );
      setSelectedItems(updated);
    } else {
      setSelectedItems([...selectedItems, { ...item, qty: 1 }]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!tableNumber || selectedItems.length === 0) return;
    onSubmit({ tableNumber, items: selectedItems });
    setSelectedItems([]);
    setTableNumber("");
  }

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Table number"
        className={styles.tableInput}
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        required
      />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />

      <div className={styles.menuGrid}>
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} onSelect={handleSelect} />
        ))}
      </div>

      <SelectedItems
        items={selectedItems}
        onUpdate={(index, newQty) => {
          const updated = [...selectedItems];
          if (newQty <= 0) return;
          updated[index].qty = newQty;
          setSelectedItems(updated);
        }}
        onRemove={(index) => {
          const updated = [...selectedItems];
          updated.splice(index, 1);
          setSelectedItems(updated);
        }}
      />

      <button type="submit" className={styles.submitBtn}>
        Submit Order
      </button>
    </form>
  );
}
