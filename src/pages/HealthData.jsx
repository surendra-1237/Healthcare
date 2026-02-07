import { useState } from "react";
import API from "../Api";

const HealthData = () => {
  const [data, setData] = useState({
    patientId: "",
    heartRate: "",
    temperature: "",
    bp: ""
  });

  const [submittedDate, setSubmittedDate] = useState(null);

  const handleChange = e =>
    setData({ ...data, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await API.post("/healthdata", data);
      setSubmittedDate(new Date().toLocaleString());
      alert("Health Data Submitted");
      setData({
        patientId: "",
        heartRate: "",
        temperature: "",
        bp: ""
      });
    } catch (err) {
      alert("Error submitting data");
    }
  };

  return (
    <div style={box}>
      <h2 style={title}>Health Data Entry</h2>

      <input
        name="patientId"
        placeholder="Patient ID"
        value={data.patientId}
        onChange={handleChange}
        style={input}
      />

      <input
        name="heartRate"
        placeholder="Heart Rate"
        value={data.heartRate}
        onChange={handleChange}
        style={input}
      />

      <input
        name="temperature"
        placeholder="Temperature"
        value={data.temperature}
        onChange={handleChange}
        style={input}
      />

      <input
        name="bp"
        placeholder="Blood Pressure"
        value={data.bp}
        onChange={handleChange}
        style={input}
      />

      <button onClick={submit} style={button}>
        Submit
      </button>

      {submittedDate && (
        <div style={successMessage}>
          ✅ Submitted on: {submittedDate}
        </div>
      )}
    </div>
  );
};

export default HealthData;

//
// ✅ INLINE STYLES (DEFINED BELOW)
//

const box = {
  width: "400px",
  margin: "auto",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0px 4px 15px rgba(0,0,0,0.15)",
  backgroundColor: "#ffffff"
};

const title = {
  textAlign: "center",
  color: "#0a4275",
  marginBottom: "20px"
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
};

const button = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#0a4275",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold"
};

const successMessage = {
  marginTop: "15px",
  padding: "12px",
  backgroundColor: "#e8f5e9",
  color: "#2e7d32",
  borderRadius: "6px",
  textAlign: "center",
  fontWeight: "bold"
};
