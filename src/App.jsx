import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";


export default function App(){
  return(
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ="/admin" element={<AdminPage />} />
      </Routes>
      </Layout>
    </Router>
  )
}