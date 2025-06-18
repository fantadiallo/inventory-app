import { useEffect, useState } from "react";
import styles from "./LogHistory.module.scss";
import { supabase } from "../../supabse/client";

/**
 * LogHistory component
 *
 * Displays a list of approved logs with date, items, and quantities.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function LogHistory() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApprovedLogs() {
      setLoading(true);
      const { data, error } = await supabase
        .from("daily_logs")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching approved logs:", error);
      } else {
        setLogs(data);
      }

      setLoading(false);
    }

    fetchApprovedLogs();
  }, []);

  return (
    <section className={styles.logHistory}>
      <h2>Approved Logs</h2>
      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p>No approved logs found.</p>
      ) : (
        <ul className={styles.logList}>
          {logs.map((log) => (
            <li key={log.id} className={styles.logItem}>
              <div className={styles.logHeader}>
                <strong>Date:</strong> {new Date(log.created_at).toLocaleDateString()}
              </div>
              <div><strong>Item:</strong> {log.item_name}</div>
              <div><strong>Used:</strong> {log.amount_used}</div>
              <div><strong>Reason:</strong> {log.reason || "N/A"}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
