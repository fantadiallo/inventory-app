import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { logoutUser } from "../../utils/logout";

/**
 * Header component for the Inventory App.
 *
 * Renders the header with responsive nav and logout/login logic.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logoutUser();
    closeMenu();
    setIsLoggedIn(false);
    navigate("/login"); // go to login page
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.navContainer} container`}>
        <h1 className={styles.logo}>Inventory App</h1>
        <button className={`${styles.menuToggle} d-md-none`} onClick={toggleMenu}>
          ☰
        </button>

        <nav className={`${styles.navLinks} d-none d-md-flex`}>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/log-history">Log History</Link>
          {isLoggedIn ? (
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>

      {menuOpen && (
        <div className={styles.fullscreenMenu}>
          <button className={styles.closeBtn} onClick={closeMenu}>X</button>
          <nav className={styles.mobileNav}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/admin" onClick={closeMenu}>Admin</Link>
            <Link to="/log-history" onClick={closeMenu}>Log History</Link>
            {isLoggedIn ? (
              <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login" onClick={closeMenu}>Login</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
