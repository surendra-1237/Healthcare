import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import HealthData from "./pages/HealthData";
import Alerts from "./pages/Alerts";

import PatientDashboard from "./pages/patient/PatientDashboard";
import AddHealthData from "./pages/patient/AddHealthData";
import Reports from "./pages/patient/Reports";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Prescription from "./pages/doctor/Prescription";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div style={{ padding: "30px", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/health" element={<HealthData />} />
            <Route path="/alerts" element={<Alerts />} />

            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/add-health" element={<AddHealthData />} />
            <Route path="/reports" element={<Reports />} />

            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/prescription" element={<Prescription />} />

            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
