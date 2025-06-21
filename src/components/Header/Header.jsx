import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { logoutUser } from "../../utils/logout";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const adminCode = localStorage.getItem("business_code");
    setIsLoggedIn(!!user);
    setRole(adminCode ? "admin" : "worker");
  }, []);

  const isAdmin = role === "admin";
  const isWorker = role === "worker";

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logoutUser();
    closeMenu();
    setIsLoggedIn(false);
    setRole("");
    navigate("/auth");
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

          {(isAdmin || isWorker) && (
            <div className={styles.dropdown}>
              <button className={styles.dropBtn}>Operations ▾</button>
              <div className={styles.dropdownContent}>
                <Link to="/orders">Waitress</Link>
                <Link to="/kitchen">Kitchen</Link>
                <Link to="/shopping-list">Shopping List</Link>
              </div>
            </div>
          )}

          {isAdmin && (
            <div className={styles.dropdown}>
              <button className={styles.dropBtn}>Admin Panel ▾</button>
              <div className={styles.dropdownContent}>
                <Link to="/admin">Admin</Link>
                <Link to="/log-history">Log History</Link>
                <Link to="/report">Report</Link>
                <Link to="/menu-manager">Menu Manager</Link>
              </div>
            </div>
          )}

          {isLoggedIn ? (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </nav>
      </div>

      {menuOpen && (
        <div className={styles.fullscreenMenu}>
          <button className={styles.closeBtn} onClick={closeMenu}>X</button>
          <nav className={styles.mobileNav}>
            <Link to="/" onClick={closeMenu}>Home</Link>

            {(isAdmin || isWorker) && (
              <>
                <Link to="/orders" onClick={closeMenu}>Waitress</Link>
                <Link to="/kitchen" onClick={closeMenu}>Kitchen</Link>
                <Link to="/shopping-list" onClick={closeMenu}>Shopping List</Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link to="/admin" onClick={closeMenu}>Admin</Link>
                <Link to="/log-history" onClick={closeMenu}>Log History</Link>
                <Link to="/report" onClick={closeMenu}>Report</Link>
                <Link to="/menu-manager" onClick={closeMenu}>Menu Manager</Link>
              </>
            )}

            {isLoggedIn ? (
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/auth" onClick={closeMenu}>Login</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
