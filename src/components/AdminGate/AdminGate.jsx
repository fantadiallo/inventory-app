import { useState, useEffect } from "react";

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
      <div className="admin-gate">
        <h2>Enter 6-digit business code</h2>
        <form onSubmit={handleCodeCheck}>
          <input
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            maxLength={6}
            placeholder="XXXXXX"
          />
          <button type="submit">Unlock Admin</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return children;
}
