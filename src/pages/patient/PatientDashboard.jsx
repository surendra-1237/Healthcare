import { useEffect, useState } from "react";
import ChartComponent from "../../components/ChartComponent";
import API from "../../Api";

const PatientDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalRecords: 0, avgHR: 0, avgTemp: 0 });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/alerts");
        const data = res.data || [];
        setLogs(data.slice(0, 5));
        if (data.length) {
          const avgHR = (data.reduce((s, d) => s + (d.value || 0), 0) / data.length).toFixed(1);
          setStats({ totalRecords: data.length, avgHR, avgTemp: 98.5 });
        }
      } catch (e) {
        console.log("Error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div style={container}>
      <h2 style={pageTitle}>👨‍⚕️ Patient Dashboard</h2>

      <div style={statsGrid}>
        <div style={{...statCard, background: "#e3f2fd"}}>
          <div style={statNum}>{stats.totalRecords}</div>
          <div style={statLabel}>Total Records</div>
        </div>
        <div style={{...statCard, background: "#fce4ec"}}>
          <div style={statNum}>{stats.avgHR}</div>
          <div style={statLabel}>Avg Heart Rate</div>
        </div>
        <div style={{...statCard, background: "#f3e5f5"}}>
          <div style={statNum}>{stats.avgTemp}°C</div>
          <div style={statLabel}>Avg Temperature</div>
        </div>
        <div style={{...statCard, background: "#e8f5e9"}}>
          <div style={statNum}>98%</div>
          <div style={statLabel}>Health Score</div>
        </div>
      </div>

      <div style={section}>
        <h3 style={sectionTitle}>📈 Trends</h3>
        <ChartComponent />
      </div>

      <div style={section}>
        <h3 style={sectionTitle}>📋 Recent Logs</h3>
        {loading && <div>Loading...</div>}
        {logs.length === 0 && <div style={noData}>No health logs yet</div>}
        <div style={logList}>
          {logs.map((l, i) => (
            <div key={i} style={logItem}>
              <div style={logHeader}>
                <strong>{l.patientName}</strong>
                <span style={logTime}>{new Date(l.timestamp.$date || l.timestamp).toLocaleDateString()}</span>
              </div>
              <div style={logContent}>
                <span style={logDetail}>❤️ {l.value} bpm</span>
                <span style={logDetail}>🏥 {l.disease}</span>
                <span style={logDetail}>{l.alertType}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const container = { maxWidth: 1200, margin: "0 auto", padding: "30px 20px" };
const pageTitle = { fontSize: "32px", fontWeight: "bold", color: "#0a4275", marginBottom: "30px" };
const statsGrid = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" };
const statCard = { padding: "20px", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const statNum = { fontSize: "32px", fontWeight: "bold", color: "#0a4275", marginBottom: "8px" };
const statLabel = { fontSize: "14px", color: "#666", fontWeight: "500" };
const section = { background: "white", borderRadius: "12px", padding: "25px", marginBottom: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const sectionTitle = { fontSize: "20px", fontWeight: "bold", color: "#0a4275", marginBottom: "20px" };
const logList = { display: "flex", flexDirection: "column", gap: "12px" };
const logItem = { padding: "15px", background: "#f9f9f9", borderLeft: "4px solid #667eea", borderRadius: "8px" };
const logHeader = { display: "flex", justifyContent: "space-between", marginBottom: "8px" };
const logTime = { fontSize: "12px", color: "#999" };
const logContent = { display: "flex", gap: "15px", fontSize: "13px", color: "#666" };
const logDetail = { display: "flex", alignItems: "center", gap: "4px" };
const noData = { padding: "30px", textAlign: "center", color: "#999" };

export default PatientDashboard;
