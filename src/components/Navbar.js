import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }

  return (
    <header style={{
      background: "#1e2b32", color: "white", padding: "18px 40px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      position: "relative", zIndex: 1000
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ color: "#f4a742", fontSize: "26px" }}>⛰</span>
        <h2 style={{ margin: 0 }}>Aventures Alpines</h2>
      </div>

      <nav style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <Link style={linkStyle} to="/">Accueil</Link>

        <div style={dropdownWrapper}
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}>
          <Link style={linkStyle} to="/activites">Activités</Link>
          {showDropdown && (
            <div style={dropdownStyle}>
              <Link style={dropdownLink} to="/randonnee">Randonnée</Link>
              <Link style={dropdownLink} to="/escalade">Escalade</Link>
              <Link style={dropdownLinkNoBorder} to="/ski">Ski</Link>
              
            </div>
          )}
        </div>

        <Link style={linkStyle} to="/articles">Articles</Link>
        <Link style={linkStyle} to="/contact">Contact</Link>

        {user && user.role === "admin" && (
          <Link style={{ ...linkStyle, color: "#f4a742" }} to="/admin">⚙️ Admin</Link>
        )}

        {user && user.role === "admin" && (
          <Link style={{ ...linkStyle, color: "#f4a742" }} to="/ajouter">➕ Ajouter</Link>
        )}

        {user && user.role !== "admin" && (
          <Link style={linkStyle} to="/profil">👤 Mon Profil</Link>
        )}

        {user ? (
          <button onClick={logout} style={logoutButton}>Déconnexion</button>
        ) : (
          <Link style={linkStyle} to="/connexion">Connexion</Link>
        )}
      </nav>
    </header>
  );
}

const linkStyle = { color: "white", textDecoration: "none", fontWeight: "500" };
const logoutButton = { background: "#f4a742", border: "none", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "500" };
const dropdownWrapper = { position: "relative", paddingBottom: "12px", marginBottom: "-12px" };
const dropdownStyle = { position: "absolute", top: "100%", left: "0", marginTop: "0", background: "white", borderRadius: "10px", boxShadow: "0 8px 20px rgba(0,0,0,0.15)", minWidth: "190px", display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 2000 };
const dropdownLink = { color: "#1e2b32", textDecoration: "none", padding: "12px 16px", fontWeight: "500", borderBottom: "1px solid #f1f1f1", background: "white" };
const dropdownLinkNoBorder = { color: "#1e2b32", textDecoration: "none", padding: "12px 16px", fontWeight: "500", background: "white" };

export default Navbar;