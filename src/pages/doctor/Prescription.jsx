import { useEffect, useState } from "react";
import API from "../../Api";

const Prescription = () => {
  const [form, setForm] = useState({ patientId: "", patientName: "", diagnosis: "", medicines: "" });
  const [patients, setPatients] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/patients");
        setPatients(res.data || []);
      } catch (e) {
        console.log("Error");
      }
    };
    fetch();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "patientId") {
      const patient = patients.find(p => p._id === value);
      if (patient) setForm(f => ({ ...f, patientName: patient.name }));
    }
  };

  const save = () => {
    if (!form.patientId || !form.diagnosis || !form.medicines) {
      alert("Fill all fields");
      return;
    }
    const content = `PRESCRIPTION\n${"=".repeat(40)}\nDate: ${new Date().toLocaleDateString()}\nPatient: ${form.patientName}\nPatient ID: ${form.patientId}\n\nDIAGNOSIS:\n${form.diagnosis}\n\nMEDICINES:\n${form.medicines}\n${"=".repeat(40)}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prescription_${form.patientId}_${new Date().getTime()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={container}>
      <div style={card}>
        <div style={header}>
          <h2 style={title}>Create Prescription</h2>
          <p style={subtitle}>Issue prescription to patient</p>
        </div>

        {saved && <div style={successMsg}>✓ Prescription saved and downloaded!</div>}

        <div style={formStyle}>
          <div style={formGroup}>
            <label style={label}>Select Patient</label>
            <select name="patientId" value={form.patientId} onChange={handleChange} style={input}>
              <option value="">Choose patient</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div style={formGroup}>
            <label style={label}>Diagnosis</label>
            <textarea name="diagnosis" placeholder="Enter diagnosis..." value={form.diagnosis} onChange={handleChange} style={{...textarea, height: "100px"}} />
          </div>

          <div style={formGroup}>
            <label style={label}>Medicines & Dosage</label>
            <textarea name="medicines" placeholder="Enter medicines with dosage details..." value={form.medicines} onChange={handleChange} style={{...textarea, height: "150px"}} />
          </div>

          <div style={{display: "flex", gap: "10px"}}>
            <button onClick={save} style={button}>💾 Save & Download</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const container = { maxWidth: 800, margin: "0 auto", padding: "30px 20px" };
const card = { background: "white", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", overflow: "hidden" };
const header = { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "25px" };
const title = { margin: 0, fontSize: "24px", fontWeight: "bold" };
const subtitle = { margin: "8px 0 0 0", opacity: 0.9, fontSize: "14px" };
const formStyle = { padding: "30px" };
const formGroup = { marginBottom: "20px" };
const label = { display: "block", marginBottom: "8px", fontWeight: "600", color: "#333", fontSize: "14px" };
const input = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" };
const textarea = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box", fontFamily: "inherit" };
const button = { padding: "12px 20px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
const successMsg = { padding: "12px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "8px", marginBottom: "20px", textAlign: "center", fontWeight: "600" };

export default Prescription;
