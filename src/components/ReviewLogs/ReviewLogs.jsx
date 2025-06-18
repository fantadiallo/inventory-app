/**
 * ReviewLogs.jsx
 * This component allows the admin to view, approve, or reject submitted inventory logs.
 * Upon approval, it updates the inventory and marks the log as approved.
 * Upon rejection, it marks the log as rejected and optionally allows a comment.
 */

import { useEffect, useState } from 'react';
import styles from './ReviewLogs.module.scss';
import { supabase } from '../../supabse/client';


export default function ReviewLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingLogs();
  }, []);

  async function fetchPendingLogs() {
    setLoading(true);
    const { data, error } = await supabase
      .from('stock_logs')
      .select('*')
      .eq('status', 'pending');

    if (!error) setLogs(data);
    setLoading(false);
  }

  async function handleApproval(log, approved = true) {
    const status = approved ? 'approved' : 'rejected';
    await supabase
      .from('stock_logs')
      .update({ status })
      .eq('id', log.id);

    if (approved) {
      await supabase.rpc('deduct_stock', {
        item_name: log.item,
        quantity_used: log.amount
      });
    }

    fetchPendingLogs();
  }

  return (
    <div className={styles.reviewLogs}>
      <h2>Pending Logs for Approval</h2>
      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p>No pending logs.</p>
      ) : (
        <ul className={styles.logList}>
          {logs.map((log) => (
            <li key={log.id} className={styles.logItem}>
              <div>
                <strong>{log.item}</strong> — {log.amount} used on {log.date}
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleApproval(log, true)}>Approve ✅</button>
                <button onClick={() => handleApproval(log, false)}>Reject ❌</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
