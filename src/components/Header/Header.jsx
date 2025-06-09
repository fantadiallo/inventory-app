import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header(){
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);
return (
<header className="header">
    <div className="navContainer container d-flex justify-content-between align-items-center">
             <h1 className="fs-4 m-0">Inventory App</h1>
             <button className="menuToggle d-md-none" onClick={toggleMenu}>
                  ☰
        </button>
      <nav className="navLinks d-none d-md-flex gap-2">
        <Link to="/">Home</Link>
        <Link to="/admin">admin
        </Link> 
      </nav>
</div>
{menuOpen && (
    <div className="fullscreenMenu">
      <button className="closeBtn" onClick={closeMenu}>X</button>
      <nav className="mobileNav">
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/admin" onClick={closeMenu}>admin</Link>
      </nav>
 </div>
)}
</header>
);
}