import { useState } from "react";
import API from "../../Api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = "Name is required";
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.password || form.password.length < 6) e.password = "Password min 6 characters";
    if (!form.phone || !/^[0-9+\-() ]{10,}$/.test(form.phone)) e.phone = "Valid phone required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await API.post("/register", form);
      setSuccess(true);
      setForm({ name: "", email: "", password: "", role: "patient", phone: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setErrors({ submit: "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <div style={header}>
          <h2 style={title}>Register</h2>
          <p style={subtitle}>Join our healthcare platform</p>
        </div>

        {success && <div style={successMsg}>✓ Registered successfully!</div>}
        {errors.submit && <div style={errorMsg}>{errors.submit}</div>}

        <form onSubmit={submit} style={formStyle}>
          <div style={formGroup}>
            <label style={label}>Full Name</label>
            <input
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              style={{...input, borderColor: errors.name ? "#d32f2f" : "#ddd"}}
            />
            {errors.name && <div style={err}>{errors.name}</div>}
          </div>

          <div style={formGroup}>
            <label style={label}>Email</label>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              style={{...input, borderColor: errors.email ? "#d32f2f" : "#ddd"}}
            />
            {errors.email && <div style={err}>{errors.email}</div>}
          </div>

          <div style={formGroup}>
            <label style={label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              style={{...input, borderColor: errors.password ? "#d32f2f" : "#ddd"}}
            />
            {errors.password && <div style={err}>{errors.password}</div>}
          </div>

          <div style={twoCol}>
            <div style={formGroup}>
              <label style={label}>Role</label>
              <select name="role" value={form.role} onChange={handleChange} style={input}>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div style={formGroup}>
              <label style={label}>Phone</label>
              <input
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={form.phone}
                onChange={handleChange}
                style={{...input, borderColor: errors.phone ? "#d32f2f" : "#ddd"}}
              />
              {errors.phone && <div style={err}>{errors.phone}</div>}
            </div>
          </div>

          <button style={{...button, opacity: loading ? 0.7 : 1}} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

const container = { minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" };
const card = { background: "white", borderRadius: "12px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: "100%", maxWidth: "500px", overflow: "hidden" };
const header = { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", padding: "30px", textAlign: "center" };
const title = { margin: 0, fontSize: "28px", fontWeight: "bold" };
const subtitle = { margin: "8px 0 0 0", opacity: 0.9, fontSize: "14px" };
const formStyle = { padding: "30px" };
const formGroup = { marginBottom: "20px" };
const label = { display: "block", marginBottom: "8px", fontWeight: "600", color: "#333", fontSize: "14px" };
const input = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box", transition: "border-color 0.3s" };
const twoCol = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" };
const button = { width: "100%", padding: "12px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", transition: "transform 0.2s" };
const err = { color: "#d32f2f", fontSize: "12px", marginTop: "4px" };
const successMsg = { padding: "12px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "8px", marginBottom: "20px", textAlign: "center", fontWeight: "600" };
const errorMsg = { padding: "12px", background: "#ffebee", color: "#d32f2f", borderRadius: "8px", marginBottom: "20px", textAlign: "center", fontWeight: "600" };

export default Register;
