import AddInventoryItem from "../components/AddInventoryItem/AddInventoryItem";
import InventoryList from "../components/InventoryList/InventoryList";
import LowStockAlert from "../components/LowStockAlert/LowStockAlert";
import ReviewLogs from "../components/ReviewLogs/ReviewLogs";


export default function AdminPage() {
  return (
    <main>
        <ReviewLogs />
        <LowStockAlert />
      <AddInventoryItem />
    <InventoryList />
    </main>
  );
}