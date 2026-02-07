import { useEffect, useState } from "react";
import API from "../Api";

const Home = () => {
  const [stats, setStats] = useState({
    totalAlerts: 0,
    highAlerts: 0,
    lowAlerts: 0,
    normalAlerts: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/alerts");
        const alerts = res.data || [];
        
        setStats({
          totalAlerts: alerts.length,
          highAlerts: alerts.filter(a => a.alertType === "High Heart Rate").length,
          lowAlerts: alerts.filter(a => a.alertType === "Low Heart Rate").length,
          normalAlerts: alerts.filter(a => a.alertType === "Normal Heart Rate").length
        });
      } catch (err) {
        console.log("Error fetching stats");
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={container}>
      <h1 style={title}>🏥 Cloud Healthcare Monitoring System</h1>
      <p style={text}>
        A real-time cloud-based healthcare application to manage patients,
        monitor health data, and generate alerts during critical conditions.
      </p>

      <div style={cardContainer}>
        <div style={card}>👤 Patient Registration</div>
        <div style={card}>📊 Health Monitoring</div>
        <div style={card}>🚨 Alert System</div>
      </div>

      <h2 style={statsTitle}>📈 System Statistics</h2>
      <div style={statsContainer}>
        <div style={{...statCard, borderTopColor: "#0a4275"}}>
          <div style={statNumber}>{stats.totalAlerts}</div>
          <div style={statLabel}>Total Alerts</div>
        </div>
        <div style={{...statCard, borderTopColor: "#d32f2f"}}>
          <div style={statNumber}>{stats.highAlerts}</div>
          <div style={statLabel}>High Heart Rate</div>
        </div>
        <div style={{...statCard, borderTopColor: "#f57c00"}}>
          <div style={statNumber}>{stats.lowAlerts}</div>
          <div style={statLabel}>Low Heart Rate</div>
        </div>
        <div style={{...statCard, borderTopColor: "#2e7d32"}}>
          <div style={statNumber}>{stats.normalAlerts}</div>
          <div style={statLabel}>Normal Heart Rate</div>
        </div>
      </div>
    </div>
  );
};

const container = { 
  textAlign: "center",
  padding: "20px"
};
const title = { 
  color: "#0a4275",
  marginBottom: "10px"
};
const text = { 
  fontSize: "18px",
  marginBottom: "30px"
};
const cardContainer = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "30px",
  marginBottom: "40px",
  flexWrap: "wrap",
  gap: "20px"
};
const card = {
  width: "200px",
  padding: "20px",
  backgroundColor: "#e3f2fd",
  borderRadius: "10px",
  fontWeight: "bold"
};

const statsTitle = {
  color: "#0a4275",
  marginTop: "40px",
  marginBottom: "20px"
};

const statsContainer = {
  display: "flex",
  justifyContent: "space-around",
  gap: "20px",
  maxWidth: "900px",
  margin: "0 auto",
  flexWrap: "wrap"
};

const statCard = {
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  borderTop: "4px solid",
  width: "150px",
  textAlign: "center"
};

const statNumber = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#0a4275",
  marginBottom: "10px"
};

const statLabel = {
  fontSize: "14px",
  color: "#666"
};

export default Home;
