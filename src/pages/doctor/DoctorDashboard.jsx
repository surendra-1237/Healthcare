import { useEffect, useState } from "react";
import API from "../../Api";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const pRes = await API.get("/patients");
        const dRes = await API.get("/doctors");
        const aRes = await API.get("/alerts");
        setPatients(pRes.data || []);
        setDoctors(dRes.data || []);
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

      <div style={gridThree}>
        <div style={section}>
          <h3 style={sectionTitle}>👥 Doctors ({doctors.length})</h3>
          {loading && <div>Loading...</div>}
          {doctors.length === 0 && <div style={noData}>No doctors found</div>}
          <div style={list}>
            {doctors.map((d, i) => (
              <div key={i} style={doctorItem}>
                <div style={{fontWeight: "bold", color: "#667eea"}}>{d.name}</div>
                <div style={{fontSize: "12px", color: "#999", marginTop: "4px"}}>🏥 {d.specialty}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={section}>
          <h3 style={sectionTitle}>Assigned Patients ({patients.length})</h3>
          {patients.length === 0 && <div style={noData}>No patients assigned</div>}
          <div style={list}>
            {patients.slice(0, 5).map((p, i) => (
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

const container = { maxWidth: 1400, margin: "0 auto", padding: "30px 20px" };
const pageTitle = { fontSize: "32px", fontWeight: "bold", color: "#0a4275", marginBottom: "30px" };
const gridThree = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "25px" };
const section = { background: "white", borderRadius: "12px", padding: "25px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const sectionTitle = { fontSize: "18px", fontWeight: "bold", color: "#0a4275", marginBottom: "20px", marginTop: 0 };
const list = { display: "flex", flexDirection: "column", gap: "12px" };
const doctorItem = { padding: "12px", background: "#f0f4ff", borderRadius: "8px", borderLeft: "4px solid #667eea" };
const listItem = { padding: "12px", background: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #667eea", paddingLeft: "12px" };
const noData = { padding: "30px", textAlign: "center", color: "#999", fontSize: "14px" };

export default DoctorDashboard;
