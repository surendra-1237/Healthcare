import { useEffect, useState } from "react";
import API from "../../Api";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const pRes = await API.get("/patients");
        const aRes = await API.get("/alerts");
        setPatients(pRes.data || []);
        const criticalAlerts = (aRes.data || []).filter(a => a.alertType === "High Heart Rate");
        setAlerts(criticalAlerts.slice(0, 5));
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
      <h2 style={pageTitle}>👨‍⚕️ Doctor Dashboard</h2>

      <div style={gridTwo}>
        <div style={section}>
          <h3 style={sectionTitle}>Assigned Patients ({patients.length})</h3>
          {loading && <div>Loading...</div>}
          {patients.length === 0 && <div style={noData}>No patients assigned</div>}
          <div style={list}>
            {patients.map((p, i) => (
              <div key={i} style={listItem}>
                <div style={{fontWeight: "bold"}}>{p.name}</div>
                <div style={{fontSize: "13px", color: "#666"}}>ID: {p._id.substring(0, 8)}...</div>
              </div>
            ))}
          </div>
        </div>

        <div style={section}>
          <h3 style={sectionTitle}>⚠️ Critical Patients</h3>
          {alerts.length === 0 && <div style={noData}>No critical alerts</div>}
          <div style={list}>
            {alerts.map((a, i) => (
              <div key={i} style={{...listItem, borderLeft: "4px solid #d32f2f", paddingLeft: "12px"}}>
                <div style={{fontWeight: "bold", color: "#d32f2f"}}>{a.patientName}</div>
                <div style={{fontSize: "13px", color: "#666"}}>❤️ {a.value} bpm - {a.disease}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const container = { maxWidth: 1200, margin: "0 auto", padding: "30px 20px" };
const pageTitle = { fontSize: "32px", fontWeight: "bold", color: "#0a4275", marginBottom: "30px" };
const gridTwo = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" };
const section = { background: "white", borderRadius: "12px", padding: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const sectionTitle = { fontSize: "18px", fontWeight: "bold", color: "#0a4275", marginBottom: "20px", marginTop: 0 };
const list = { display: "flex", flexDirection: "column", gap: "12px" };
const listItem = { padding: "12px", background: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #667eea", paddingLeft: "12px" };
const noData = { padding: "30px", textAlign: "center", color: "#999" };

export default DoctorDashboard;
