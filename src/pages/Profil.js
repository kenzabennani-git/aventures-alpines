import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profil() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [onglet, setOnglet] = useState("profil");

  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}

  useEffect(() => {
    if (!user) { navigate("/connexion"); return; }
    fetchReservations();
  }, []);

  async function fetchReservations() {
    const res = await fetch(`http://localhost:5000/api/reservations/${user.id}`);
    const data = await res.json();
    setReservations(Array.isArray(data) ? data : []);
  }

  async function annulerReservation(id) {
    await fetch(`http://localhost:5000/api/reservations/${id}`, { method: "DELETE" });
    fetchReservations();
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>Mon Espace</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>Bonjour, {user?.nom_utilisateur} 👋</p>

      {/* ONGLETS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        {["profil", "reservations"].map(o => (
          <button key={o} onClick={() => setOnglet(o)} style={{
            padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer",
            background: onglet === o ? "#2f5d4e" : "#e5e7eb",
            color: onglet === o ? "white" : "#333", fontWeight: "500"
          }}>
            {o === "profil" ? "Mon Profil" : "Mes Réservations"}
          </button>
        ))}
      </div>

      {/* PROFIL */}
      {onglet === "profil" && (
        <div style={{ background: "#f9fafb", padding: "30px", borderRadius: "16px", maxWidth: "500px" }}>
          <h2 style={{ marginBottom: "20px" }}>Mes informations</h2>
          <p><strong>Nom :</strong> {user?.nom_utilisateur}</p>
          <p><strong>Email :</strong> {user?.email}</p>
          <p><strong>Rôle :</strong> <span style={{ color: "#2f5d4e", fontWeight: "bold" }}>Membre</span></p>
          <p><strong>Inscrit le :</strong> {user?.date_inscription?.slice(0,10)}</p>
        </div>
      )}

      {/* RESERVATIONS */}
      {onglet === "reservations" && (
        <div>
          <h2 style={{ marginBottom: "20px" }}>Mes réservations</h2>
          {reservations.length === 0 ? (
            <p style={{ color: "#666" }}>Vous n'avez aucune réservation pour le moment.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {reservations.map(r => (
                <div key={r.id} style={{
                  background: "white", borderRadius: "12px", padding: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex",
                  justifyContent: "space-between", alignItems: "center"
                }}>
                  <div>
                    <h3 style={{ margin: "0 0 8px" }}>{r.activite_nom}</h3>
                    <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                      Du {r.date_debut?.slice(0,10)} au {r.date_fin?.slice(0,10)} • {r.nb_personnes} personne(s) • {r.prix}€
                    </p>
                    <span style={{ color: "green", fontSize: "13px", fontWeight: "500" }}>{r.statut}</span>
                  </div>
                  <button onClick={() => annulerReservation(r.id)} style={{
                    background: "#fee2e2", color: "#991b1b", border: "none",
                    padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "500"
                  }}>
                    Annuler
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profil;