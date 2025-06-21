import styles from "./ShareExportButtons.module.scss";

export default function ShareExportButtons({ reportText }) {
  function handleShareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(reportText)}`;
    window.open(url, "_blank");
  }

  function handleCopy() {
    navigator.clipboard.writeText(reportText);
    alert("Report copied to clipboard!");
  }

  function handlePrint() {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${reportText}</pre>`);
    newWindow.document.close();
    newWindow.print();
  }

  return (
    <div className={styles.buttonRow}>
      <button onClick={handleShareWhatsApp}>📲 Share on WhatsApp</button>
      <button onClick={handleCopy}>📋 Copy</button>
      <button onClick={handlePrint}>🖨️ Print</button>
    </div>
  );
}
