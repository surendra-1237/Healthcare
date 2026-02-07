import { useEffect, useState } from "react";
import API from "../../Api";

const AddHealthData = () => {
  const [form, setForm] = useState({ patientId: "", bp: "", heartRate: "", temperature: "", weight: "", datetime: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/patients");
        setPatients(res.data || []);
      } catch (e) {
        console.log("Error fetching patients");
      }
    };
    fetch();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const validate = () => {
    const e = {};
    if (!form.patientId) e.patientId = "Select a patient";
    if (!form.bp?.trim()) e.bp = "BP required";
    if (!form.heartRate) e.heartRate = "Heart rate required";
    if (!form.temperature) e.temperature = "Temperature required";
    if (!form.weight) e.weight = "Weight required";
    if (!form.datetime) e.datetime = "Date & time required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = {
        patientId: form.patientId,
        heartRate: form.heartRate,
        temperature: form.temperature,
        bp: form.bp
      };
      await API.post("/healthdata", payload);
      setSuccess(true);
      setForm({ patientId: "", bp: "", heartRate: "", temperature: "", weight: "", datetime: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({ submit: "Submit failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <div style={header}>
          <h2 style={title}>Add Health Data</h2>
          <p style={subtitle}>Record patient vitals and measurements</p>
        </div>

        {success && <div style={successMsg}>✓ Health data submitted successfully!</div>}
        {errors.submit && <div style={errorMsg}>{errors.submit}</div>}

        <form style={formStyle} onSubmit={submit}>
          <div style={formGroup}>
            <label style={label}>Select Patient</label>
            <select name="patientId" value={form.patientId} onChange={handleChange} style={{...input, borderColor: errors.patientId ? "#d32f2f" : "#ddd"}}>
              <option value="">Choose a patient</option>
              {patients.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
            {errors.patientId && <div style={err}>{errors.patientId}</div>}
          </div>

          <div style={twoCol}>
            <div style={formGroup}>
              <label style={label}>Blood Pressure</label>
              <input name="bp" placeholder="120/80" value={form.bp} onChange={handleChange} style={{...input, borderColor: errors.bp ? "#d32f2f" : "#ddd"}} />
              {errors.bp && <div style={err}>{errors.bp}</div>}
            </div>

            <div style={formGroup}>
              <label style={label}>Heart Rate</label>
              <input name="heartRate" type="number" placeholder="70 bpm" value={form.heartRate} onChange={handleChange} style={{...input, borderColor: errors.heartRate ? "#d32f2f" : "#ddd"}} />
              {errors.heartRate && <div style={err}>{errors.heartRate}</div>}
            </div>
          </div>

          <div style={twoCol}>
            <div style={formGroup}>
              <label style={label}>Temperature</label>
              <input name="temperature" type="number" step="0.1" placeholder="98.6°F" value={form.temperature} onChange={handleChange} style={{...input, borderColor: errors.temperature ? "#d32f2f" : "#ddd"}} />
              {errors.temperature && <div style={err}>{errors.temperature}</div>}
            </div>

            <div style={formGroup}>
              <label style={label}>Weight</label>
              <input name="weight" type="number" placeholder="70 kg" value={form.weight} onChange={handleChange} style={{...input, borderColor: errors.weight ? "#d32f2f" : "#ddd"}} />
              {errors.weight && <div style={err}>{errors.weight}</div>}
            </div>
          </div>

          <div style={formGroup}>
            <label style={label}>Date & Time</label>
            <input type="datetime-local" name="datetime" value={form.datetime} onChange={handleChange} style={{...input, borderColor: errors.datetime ? "#d32f2f" : "#ddd"}} />
            {errors.datetime && <div style={err}>{errors.datetime}</div>}
          </div>

          <button style={{...button, opacity: loading ? 0.7 : 1}} disabled={loading}>{loading ? "Submitting..." : "Submit Health Data"}</button>
        </form>
      </div>
    </div>
  );
};

const container = { maxWidth: 900, margin: "0 auto", padding: "30px 20px" };
const card = { background: "white", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", overflow: "hidden" };
const header = { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "25px" };
const title = { margin: 0, fontSize: "24px", fontWeight: "bold" };
const subtitle = { margin: "8px 0 0 0", opacity: 0.9, fontSize: "14px" };
const formStyle = { padding: "30px", display: "flex", flexDirection: "column", gap: "20px" };
const formGroup = { display: "flex", flexDirection: "column" };
const label = { marginBottom: "8px", fontWeight: "600", color: "#333", fontSize: "14px" };
const input = { padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" };
const twoCol = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" };
const button = { padding: "12px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" };
const err = { color: "#d32f2f", fontSize: "12px", marginTop: "4px" };
const successMsg = { padding: "12px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "8px", textAlign: "center", fontWeight: "600" };
const errorMsg = { padding: "12px", background: "#ffebee", color: "#d32f2f", borderRadius: "8px", textAlign: "center", fontWeight: "600" };

export default AddHealthData;
