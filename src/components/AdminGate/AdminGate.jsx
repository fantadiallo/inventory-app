import { useEffect, useState } from "react";
import styles from "./AdminGate.module.scss";

export default function AdminGate({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedCode = localStorage.getItem("business_code");
    if (savedCode && savedCode.length === 6) {
      setIsAuthorized(true);
    }
  }, []);

  function handleCodeCheck(e) {
    e.preventDefault();
    const savedCode = localStorage.getItem("business_code");
    if (inputCode === savedCode) {
      setIsAuthorized(true);
    } else {
      setError("Incorrect code");
    }
  }

  if (!isAuthorized) {
    return (
      <div className={styles.adminGate}>
        <h2>Enter 6-digit admin code</h2>
        <form onSubmit={handleCodeCheck} className={styles.form}>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            maxLength={6}
            placeholder="XXXXXX"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Unlock
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }

  return children;
}
