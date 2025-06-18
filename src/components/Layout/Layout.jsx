import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="mainContent container py-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
