import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      padding: "15px",
      backgroundColor: "#0a4275",
      color: "white",
      fontSize: "18px"
    }}>
      <Link style={linkStyle} to="/">Home</Link>
      <Link style={linkStyle} to="/register">Register</Link>
      <Link style={linkStyle} to="/add-health">Health Data</Link>
      <Link style={linkStyle} to="/alerts">Alerts</Link>
    </div>
  );
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold"
};

export default Navbar;
