import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
/**
 * Main application commponent.
 * Sets up routing for the inventory system React Router.
 * @component 
 * @returns {JSX.element} 
 * 
 */
export default function App(){
  return(
    <Router>
   <Routes>
   <Route path="/" element={<Layout />}>
  <Route index element={<HomePage />} />
  <Route path="admin" element={<AdminPage />} />
</Route>
      </Routes>
    </Router>
  )
}