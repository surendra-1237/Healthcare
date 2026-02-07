import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div style={wrap}>
      <div style={logo}>
        <div style={logoText}>🏥 HealthApp</div>
      </div>
      <nav style={nav}>
        <Link to="/" style={{...link, ...(isActive('/') && activeLink)}}>🏠 Home</Link>
        <Link to="/register" style={{...link, ...(isActive('/register') && activeLink)}}>📝 Register</Link>
        
        <div style={navSection}>Patient</div>
        <Link to="/patient" style={{...link, ...(isActive('/patient') && activeLink)}}>👨‍⚕️ Dashboard</Link>
        <Link to="/add-health" style={{...link, ...(isActive('/add-health') && activeLink)}}>➕ Add Health Data</Link>
        <Link to="/reports" style={{...link, ...(isActive('/reports') && activeLink)}}>📊 Reports</Link>
        
        <div style={navSection}>Doctor</div>
        <Link to="/doctor" style={{...link, ...(isActive('/doctor') && activeLink)}}>👨‍⚕️ Dashboard</Link>
        <Link to="/prescription" style={{...link, ...(isActive('/prescription') && activeLink)}}>📋 Prescription</Link>
        
        <div style={navSection}>Admin</div>
        <Link to="/admin" style={{...link, ...(isActive('/admin') && activeLink)}}>⚙️ Dashboard</Link>
        
        <Link to="/alerts" style={{...link, ...(isActive('/alerts') && activeLink)}}>🚨 Alerts</Link>
      </nav>
    </div>
  );
};

const wrap = { width: 260, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: '#fff', padding: 0, minHeight: '100vh', position: "sticky", top: 0, overflowY: "auto" };
const logo = { padding: '20px', background: "rgba(0,0,0,0.1)", borderBottom: '1px solid rgba(255,255,255,0.1)' };
const logoText = { fontSize: '18px', fontWeight: 'bold', textAlign: 'center' };
const nav = { display: 'flex', flexDirection: 'column', gap: 0, marginTop: 10, padding: '0 10px' };
const navSection = { padding: '12px 15px', fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginTop: 15, marginBottom: 5 };
const link = { display: 'block', color: '#fff', textDecoration: 'none', padding: '12px 15px', borderRadius: '8px', transition: 'all 0.3s', marginBottom: '4px', fontSize: '14px' };
const activeLink = { background: 'rgba(255,255,255,0.2)', fontWeight: 'bold' };

export default Sidebar;
