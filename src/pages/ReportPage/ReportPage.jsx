import { useEffect, useState } from "react";
import { supabase } from "../../supabse/client";
import styles from "./ReportPage.module.scss";

import FilterDate from "../../components/Report/FilterDate";
import ShareExportButtons from "../../components/Report/ShareExportButtons";
import ReportSummary from "../../components/Report/ReportSummary";
import ReportTable from "../../components/Report/ReportTable";
import DailyReport from "../../components/Report/DailyReport";

export default function ReportPage() {
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState(() =>
    new Date().toISOString().split("T")[0]
  );

  const [weeklyTotal, setWeeklyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("status", "done")
        .gte("created_at", `${date}T00:00:00`)
        .lte("created_at", `${date}T23:59:59`)
        .order("created_at", { ascending: true });

      if (!error) setOrders(data || []);
    }

    async function fetchWeeklyAndMonthly() {
      const selected = new Date(date);

      // Weekly
      const weekStart = new Date(selected);
      const day = selected.getDay();
      const diffToMonday = day === 0 ? 6 : day - 1;
      weekStart.setDate(weekStart.getDate() - diffToMonday);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      // Monthly
      const monthStart = new Date(selected.getFullYear(), selected.getMonth(), 1);
      const monthEnd = new Date(selected.getFullYear(), selected.getMonth() + 1, 0);

      const { data: weeklyData } = await supabase
        .from("orders")
        .select("total")
        .eq("status", "done")
        .gte("created_at", weekStart.toISOString())
        .lte("created_at", weekEnd.toISOString());

      const { data: monthlyData } = await supabase
        .from("orders")
        .select("total")
        .eq("status", "done")
        .gte("created_at", monthStart.toISOString())
        .lte("created_at", monthEnd.toISOString());

      const weeklySum = weeklyData?.reduce((s, o) => s + o.total, 0) || 0;
      const monthlySum = monthlyData?.reduce((s, o) => s + o.total, 0) || 0;

      setWeeklyTotal(weeklySum);
      setMonthlyTotal(monthlySum);
    }

    fetchOrders();
    fetchWeeklyAndMonthly();
  }, [date]);

  function getReportText() {
    const total = orders.reduce((sum, o) => sum + o.total, 0).toFixed(2);
    const lines = orders.map((o) => {
      const items = o.items.map((i) => `${i.name} × ${i.qty}`).join(", ");
      return `🕒 ${new Date(o.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} | Table ${o.table_number} | $${o.total.toFixed(2)} | ${items}`;
    });

    return `📅 Report for ${date}\nTotal Revenue: $${total}\nTotal Orders: ${orders.length}\n\n` + lines.join("\n");
  }

  return (
    <main className={styles.reportPage}>
      <h2 className={styles.heading}>Daily Report</h2>
      <FilterDate selectedDate={date} onChange={setDate} />
      <DailyReport orders={orders} selectedDate={date} />
      <ShareExportButtons reportText={getReportText()} />
      <ReportSummary
        orders={orders}
        weeklyTotal={weeklyTotal}
        monthlyTotal={monthlyTotal}
      />
      <ReportTable orders={orders} />
    </main>
  );
}
