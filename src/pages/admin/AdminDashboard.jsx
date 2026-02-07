import { useEffect, useState } from "react";
import API from "../../Api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalAlerts: 0, highAlerts: 0, normalAlerts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const alertsRes = await API.get('/alerts');
        const patientsRes = await API.get('/patients');
        const alerts = alertsRes.data || [];
        const patients = patientsRes.data || [];
        
        setStats({
          totalUsers: patients.length,
          totalAlerts: alerts.length,
          highAlerts: alerts.filter(a => a.alertType === "High Heart Rate").length,
          normalAlerts: alerts.filter(a => a.alertType === "Normal Heart Rate").length
        });
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
      <h2 style={pageTitle}>⚙️ Admin Dashboard</h2>

      <div style={statsGrid}>
        <div style={{...statCard, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}}>
          <div style={{...statNum, color: "white"}}>{stats.totalUsers}</div>
          <div style={{...statLabel, color: "white"}}>Total Users</div>
        </div>
        <div style={{...statCard, background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"}}>
          <div style={{...statNum, color: "white"}}>{stats.totalAlerts}</div>
          <div style={{...statLabel, color: "white"}}>Total Alerts</div>
        </div>
        <div style={{...statCard, background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"}}>
          <div style={{...statNum, color: "white"}}>{stats.highAlerts}</div>
          <div style={{...statLabel, color: "white"}}>Critical Alerts</div>
        </div>
        <div style={{...statCard, background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"}}>
          <div style={{...statNum, color: "white"}}>{stats.normalAlerts}</div>
          <div style={{...statLabel, color: "white"}}>Normal Alerts</div>
        </div>
      </div>

      <div style={section}>
        <h3 style={sectionTitle}>System Overview</h3>
        {loading && <div>Loading...</div>}
        <div style={overviewGrid}>
          <div style={overviewItem}>
            <div style={{fontSize: "14px", color: "#666"}}>System Status</div>
            <div style={{fontSize: "18px", fontWeight: "bold", color: "#2e7d32"}}>✓ Operational</div>
          </div>
          <div style={overviewItem}>
            <div style={{fontSize: "14px", color: "#666"}}>Active Sessions</div>
            <div style={{fontSize: "18px", fontWeight: "bold", color: "#0a4275"}}>12</div>
          </div>
          <div style={overviewItem}>
            <div style={{fontSize: "14px", color: "#666"}}>Database Status</div>
            <div style={{fontSize: "18px", fontWeight: "bold", color: "#2e7d32"}}>✓ Connected</div>
          </div>
          <div style={overviewItem}>
            <div style={{fontSize: "14px", color: "#666"}}>API Response</div>
            <div style={{fontSize: "18px", fontWeight: "bold", color: "#0a4275"}}>45ms</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const container = { maxWidth: 1200, margin: "0 auto", padding: "30px 20px" };
const pageTitle = { fontSize: "32px", fontWeight: "bold", color: "#0a4275", marginBottom: "30px" };
const statsGrid = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" };
const statCard = { padding: "25px", borderRadius: "12px", textAlign: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" };
const statNum = { fontSize: "36px", fontWeight: "bold", marginBottom: "8px" };
const statLabel = { fontSize: "14px", fontWeight: "500" };
const section = { background: "white", borderRadius: "12px", padding: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const sectionTitle = { fontSize: "20px", fontWeight: "bold", color: "#0a4275", marginBottom: "20px", marginTop: 0 };
const overviewGrid = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" };
const overviewItem = { padding: "20px", background: "#f9f9f9", borderRadius: "8px", textAlign: "center" };

export default AdminDashboard;
