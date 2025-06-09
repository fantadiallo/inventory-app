import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Header component for the Inventory App.
 * 
 * Renders the application header with navigation links.
 * Includes a responsive menu that toggles for mobile view.
 *
 * State:
 * - menuOpen: Boolean indicating if the mobile menu is open.
 *
 * Functions:
 * - toggleMenu: Toggles the mobile menu open/close.
 * - closeMenu: Closes the mobile menu.
 *
 * @component
 * @returns {JSX.Element} The rendered header component.
 */
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