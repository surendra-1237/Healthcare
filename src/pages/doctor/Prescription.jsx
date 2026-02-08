import { useEffect, useState } from "react";
import API from "../../Api";

const Prescription = () => {
  const [form, setForm] = useState({ patientId: "", patientName: "", doctorId: "", doctorName: "", diagnosis: "", medicines: "" });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const pRes = await API.get("/patients");
        const dRes = await API.get("/doctors");
        setPatients(pRes.data || []);
        setDoctors(dRes.data || []);
      } catch (e) {
        console.log("Error");
      }
    };
    fetch();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => {
      let updated = { ...prev, [name]: value };
      if (name === "patientId") {
        const patient = patients.find(p => p._id === value);
        if (patient) updated.patientName = patient.name;
        else updated.patientName = "";
      }
      if (name === "doctorId") {
        const doctor = doctors.find(d => d._id === value);
        if (doctor) updated.doctorName = doctor.name;
        else updated.doctorName = "";
      }
      return updated;
    });
  };

  const handleDownload = () => {
    if (!form.doctorId || !form.doctorName || !form.patientId || !form.patientName || !form.diagnosis || !form.medicines) {
      alert("Fill all required fields");
      return;
    }
    const content = `PRESCRIPTION\n${"=".repeat(50)}\nDate: ${new Date().toLocaleDateString()}\nTime: ${new Date().toLocaleTimeString()}\n\nDOCTOR: ${form.doctorName}\n\nPATIENT: ${form.patientName}\nPatient ID: ${form.patientId}\n\nDIAGNOSIS:\n${form.diagnosis}\n\nMEDICINES & DOSAGE:\n${form.medicines}\n${"=".repeat(50)}\nDoctor Signature: _________________`;
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
          <div style={twoColForm}>
            <div style={formGroup}>
              <label style={label}>Select Doctor</label>
              <select name="doctorId" value={form.doctorId} onChange={handleChange} style={input}>
                <option value="">Choose doctor</option>
                {doctors.map(d => (
                  <option key={d._id} value={d._id}>{d.name} - {d.specialty}</option>
                ))}
              </select>
            </div>

            <div style={formGroup}>
              <label style={label}>Select Patient</label>
              <select name="patientId" value={form.patientId} onChange={handleChange} style={input}>
                <option value="">Choose patient</option>
                {patients.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={formGroup}>
            <label style={label}>Diagnosis</label>
            <textarea name="diagnosis" placeholder="Enter diagnosis..." value={form.diagnosis} onChange={handleChange} style={{...textarea, height: "100px"}} />
          </div>

          <div style={formGroup}>
            <label style={label}>Medicines & Dosage</label>
            <textarea name="medicines" placeholder="Enter medicines and dosage..." value={form.medicines} onChange={handleChange} style={{...textarea, height: "100px"}} />
          </div>

          <button type="button" style={button} onClick={handleDownload}>Download Prescription</button>
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
const twoColForm = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" };
const label = { display: "block", marginBottom: "8px", fontWeight: "600", color: "#333", fontSize: "14px" };
const input = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" };
const textarea = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box", fontFamily: "inherit" };
const button = { padding: "12px 20px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" };
const successMsg = { padding: "12px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "8px", marginBottom: "20px", textAlign: "center", fontWeight: "600" };

export default Prescription;
