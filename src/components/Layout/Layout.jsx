import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="mainContent container py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
