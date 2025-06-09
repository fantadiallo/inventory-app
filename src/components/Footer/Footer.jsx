import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} Inventory App. Built by Fanta.</p>
      </div>
    </footer>
  );
}