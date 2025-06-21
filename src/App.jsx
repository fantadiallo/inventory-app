import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout & Route Protection
import Layout from "./components/Layout/Layout";
import AdminGate from "./components/AdminGate/AdminGate";

// Public Pages
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import LogHistoryPage from "./pages/LogHistoryPage/LogHistoryPage";
import ShoppingListPage from "./pages/ShoppingList/ShoppingList";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import KitchenPage from "./pages/KitchenPage/KitchenPage";

// Admin-Only Pages
import AdminPage from "./pages/AdminPage";
import MenuManagerPage from "./pages/MenuManagerPage/MenuManagerPage";
import ReportPage from "./pages/ReportPage/ReportPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="log-history" element={<LogHistoryPage />} />
          <Route path="shopping-list" element={<ShoppingListPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="kitchen" element={<KitchenPage />} />
          
          {/* Admin-only routes */}
          <Route
            path="menu-manager"
            element={
              <AdminGate>
                <MenuManagerPage />
              </AdminGate>
            }
          />
          <Route
            path="report"
            element={
              <AdminGate>
                <ReportPage />
              </AdminGate>
            }
          />
          <Route
            path="admin"
            element={
              <AdminGate>
                <AdminPage />
              </AdminGate>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
