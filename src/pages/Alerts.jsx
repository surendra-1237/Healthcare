import { useEffect, useState } from "react";
import API from "../Api";

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  
  if (timestamp.$date) {
    return new Date(timestamp.$date).toLocaleString();
  }
  
  return new Date(timestamp).toLocaleString();
};

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      API.get("/alerts").then(res => setAlerts(res.data));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filter alerts (by type and search query)
  const filteredAlerts = alerts.filter(a => {
    // filter by type
    if (filterType !== "All" && a.alertType !== filterType) return false;

    // filter by search query (patient name)
    if (searchQuery && a.patientName) {
      return a.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  // Sort alerts
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = a.timestamp.$date || a.timestamp;
      const dateB = b.timestamp.$date || b.timestamp;
      return new Date(dateB) - new Date(dateA); // newest first
    }
    if (sortBy === "name") {
      return a.patientName.localeCompare(b.patientName);
    }
    return 0;
  });

  const alertTypes = ["All", "Low Heart Rate", "Normal Heart Rate", "High Heart Rate"];

  return (
    <div style={container}>
      <h2 style={heading}>🚨 Live Alerts</h2>

      {/* Filters, Search and Sort */}
      <div style={controlsBox}>
        <div style={searchBox}>
          <label style={label}>Search Patient:</label>
          <input
            placeholder="Enter patient name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={inputSearch}
          />
        </div>

        <div style={filterBox}>
          <label style={label}>Filter by Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={selectInput}>
            {alertTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div style={sortBox}>
          <label style={label}>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selectInput}>
            <option value="date">Date (Newest First)</option>
            <option value="name">Patient Name</option>
          </select>
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div style={modal}>
          <div style={modalContent}>
            <button onClick={() => setSelectedAlert(null)} style={closeBtn}>✕</button>
            <h3>Alert Details</h3>
            <p><strong>Patient Name:</strong> {selectedAlert.patientName}</p>
            <p><strong>Patient ID:</strong> {selectedAlert.patientId}</p>
            <p><strong>Alert Type:</strong> {selectedAlert.alertType}</p>
            <p><strong>Heart Rate:</strong> {selectedAlert.value} bpm</p>
            <p><strong>Disease:</strong> {selectedAlert.disease}</p>
            <p><strong>Date & Time:</strong> {formatDate(selectedAlert.timestamp)}</p>
            
            <div style={suggestionBox}>
              <h4 style={{color: "#2e7d32"}}>💡 Suggestion:</h4>
              <p style={suggestionText}>{selectedAlert.suggestion}</p>
            </div>
          </div>
        </div>
      )}

      {/* Alerts List */}
      {sortedAlerts.length === 0 && <p>No alerts</p>}
      {sortedAlerts.map((a, i) => (
        <div 
          key={i} 
          style={{...alertBox, cursor: "pointer"}}
          onClick={() => setSelectedAlert(a)}
        >
          <strong>{a.alertType}</strong> | Patient: {a.patientName} | Disease: {a.disease} | {formatDate(a.timestamp)}
          <div style={clickHint}>Click for suggestions</div>
        </div>
      ))}
    </div>
  );
};

const container = {
  padding: "20px",
  maxWidth: "900px",
  margin: "0 auto"
};

const heading = {
  textAlign: "center",
  color: "#0a4275",
  marginBottom: "20px"
};

const controlsBox = {
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
  justifyContent: "center",
  flexWrap: "wrap"
};

const filterBox = {
  display: "flex",
  gap: "10px",
  alignItems: "center"
};

const sortBox = {
  display: "flex",
  gap: "10px",
  alignItems: "center"
};

const label = {
  fontWeight: "bold",
  color: "#0a4275"
};

const selectInput = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  cursor: "pointer"
};

const searchBox = {
  display: "flex",
  gap: "10px",
  alignItems: "center"
};

const inputSearch = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  minWidth: "220px"
};

const alertBox = {
  padding: "15px",
  margin: "10px 0",
  backgroundColor: "#ffebee",
  borderLeft: "5px solid red",
  borderRadius: "6px",
  transition: "all 0.3s ease"
};

const clickHint = {
  fontSize: "12px",
  color: "#d32f2f",
  marginTop: "5px",
  fontStyle: "italic"
};

const modal = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modalContent = {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "500px",
  width: "90%",
  position: "relative",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
};

const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "15px",
  backgroundColor: "transparent",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  color: "#666"
};

const suggestionBox = {
  marginTop: "20px",
  padding: "15px",
  backgroundColor: "#e8f5e9",
  borderRadius: "8px",
  borderLeft: "4px solid #2e7d32"
};

const suggestionText = {
  color: "#2e7d32",
  fontSize: "16px",
  lineHeight: "1.6"
};

export default Alerts;
