import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ nb_utilisateurs: 0, nb_reservations: 0 });
  const [reservations, setReservations] = useState([]);
  const [onglet, setOnglet] = useState("dashboard");

  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}

  useEffect(() => {
    if (!user || user.role !== "admin") { navigate("/"); return; }
    fetchStats();
    fetchReservations();
  }, []);

  async function fetchStats() {
    const res = await fetch("http://localhost:5000/api/admin/stats");
    const data = await res.json();
    setStats(data);
  }

  async function fetchReservations() {
    const res = await fetch("http://localhost:5000/api/reservations");
    const data = await res.json();
    setReservations(Array.isArray(data) ? data : []);
  }

  async function supprimerReservation(id) {
    await fetch(`http://localhost:5000/api/reservations/${id}`, { method: "DELETE" });
    fetchReservations();
    fetchStats();
  }

  return (
    <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>Espace Admin</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>Bienvenue, {user?.nom_utilisateur}</p>

      {/* ONGLETS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        {["dashboard", "reservations", "profil"].map(o => (
          <button key={o} onClick={() => setOnglet(o)} style={{
            padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer",
            background: onglet === o ? "#2f5d4e" : "#e5e7eb",
            color: onglet === o ? "white" : "#333", fontWeight: "500"
          }}>
            {o === "dashboard" ? "📊 Dashboard" : o === "reservations" ? "📋 Réservations" : "👤 Mon Profil"}
          </button>
        ))}
      </div>

      {/* DASHBOARD */}
      {onglet === "dashboard" && (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={statCard}>
            <div style={{ fontSize: "40px" }}>👥</div>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#2f5d4e" }}>{stats.nb_utilisateurs}</div>
            <div style={{ color: "#666" }}>Utilisateurs inscrits</div>
          </div>
          <div style={statCard}>
            <div style={{ fontSize: "40px" }}>📅</div>
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "#2f5d4e" }}>{stats.nb_reservations}</div>
            <div style={{ color: "#666" }}>Réservations totales</div>
          </div>
        </div>
      )}

      {/* RESERVATIONS */}
      {onglet === "reservations" && (
        <div>
          <h2 style={{ marginBottom: "20px" }}>Toutes les réservations</h2>
          {reservations.length === 0 ? (
            <p style={{ color: "#666" }}>Aucune réservation pour le moment.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  {["ID", "Utilisateur", "Activité", "Début", "Fin", "Personnes", "Prix", "Statut", "Action"].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reservations.map(r => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={td}>{r.id}</td>
                    <td style={td}>{r.nom_utilisateur}</td>
                    <td style={td}>{r.activite_nom}</td>
                    <td style={td}>{r.date_debut?.slice(0,10)}</td>
                    <td style={td}>{r.date_fin?.slice(0,10)}</td>
                    <td style={td}>{r.nb_personnes}</td>
                    <td style={td}>{r.prix}€</td>
                    <td style={td}><span style={{ color: "green", fontWeight: "500" }}>{r.statut}</span></td>
                    <td style={td}>
                      <button onClick={() => supprimerReservation(r.id)} style={deleteBtn}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* PROFIL */}
      {onglet === "profil" && (
        <div style={{ background: "#f9fafb", padding: "30px", borderRadius: "16px", maxWidth: "500px" }}>
          <h2 style={{ marginBottom: "20px" }}>Mon Profil Admin</h2>
          <p><strong>Nom :</strong> {user?.nom_utilisateur}</p>
          <p><strong>Email :</strong> {user?.email}</p>
          <p><strong>Rôle :</strong> <span style={{ color: "#2f5d4e", fontWeight: "bold" }}>Administrateur</span></p>
          <p><strong>Inscrit le :</strong> {user?.date_inscription?.slice(0,10)}</p>
        </div>
      )}
    </div>
  );
}

const statCard = {
  background: "white", borderRadius: "16px", padding: "30px 40px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)", textAlign: "center", minWidth: "200px"
};
const th = { padding: "12px", textAlign: "left", fontWeight: "600" };
const td = { padding: "12px", fontSize: "14px" };
const deleteBtn = {
  background: "#fee2e2", color: "#991b1b", border: "none",
  padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "500"
};

export default Admin;