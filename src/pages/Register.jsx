import { useState } from "react";
import API from "../Api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    medicalHistory: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    await API.post("/register", form);
    alert("Patient Registered Successfully");
    setForm({ name:"", age:"", gender:"", contact:"", medicalHistory:"" });
  };

  return (
    <div style={box}>
      <h2>Patient Registration</h2>
      {Object.keys(form).map(key => (
        <input
          key={key}
          name={key}
          placeholder={key}
          value={form[key]}
          onChange={handleChange}
          style={input}
        />
      ))}
      <button onClick={submit} style={button}>Register</button>
    </div>
  );
};

const box = {
  width: "400px",
  margin: "auto",
  padding: "20px",
  boxShadow: "0 0 10px #ccc",
  borderRadius: "10px"
};

const input = {
  width: "100%",
  padding: "10px",
  margin: "8px 0"
};

const button = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#0a4275",
  color: "white",
  border: "none",
  borderRadius: "5px"
};

export default Register;
