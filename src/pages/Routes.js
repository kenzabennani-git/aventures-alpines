import { useEffect, useState } from "react";
import HikingRoute from "../components/HikingRoute";

function Routes() {
  const [itineraires, setItineraires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtreD, setFiltreD] = useState("Tous");
  const [filtreR, setFiltreR] = useState("Toutes");

  useEffect(() => {
    fetch("http://localhost:5000/api/itineraires")
      .then(res => res.json())
      .then(data => {
        setItineraires(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const regions = ["Toutes", ...new Set(itineraires.map(i => i.region))];
  const difficultes = ["Tous", "Facile", "Moyen", "Difficile"];

  const filtres = itineraires.filter(i => {
    const okD = filtreD === "Tous" || i.difficulte === filtreD;
    const okR = filtreR === "Toutes" || i.region === filtreR;
    return okD && okR;
  });

  return (
    <div>
      <div style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1501555088652-021faa106b9b')",
        height: "350px", backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", color: "white", textAlign: "center"
      }}>
        <h1 style={{ fontSize: "60px" }}>Nos Itinéraires</h1>
        <p style={{ fontSize: "20px" }}>Découvrez nos parcours en autonomie dans les plus beaux massifs alpins.</p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "0 20px" }}>

        {/* FILTRES */}
        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px", marginBottom: "40px", display: "flex", gap: "30px", flexWrap: "wrap", alignItems: "center" }}>
          <strong>Filtrer :</strong>
          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "1px", color: "#6b7280", display: "block", marginBottom: "6px" }}>DIFFICULTÉ</label>
            <select value={filtreD} onChange={e => setFiltreD(e.target.value)} style={{ padding: "8px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" }}>
              {difficultes.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "1px", color: "#6b7280", display: "block", marginBottom: "6px" }}>RÉGION</label>
            <select value={filtreR} onChange={e => setFiltreR(e.target.value)} style={{ padding: "8px 14px", border: "1px solid #d1d5db", borderRadius: "8px", fontSize: "14px" }}>
              {regions.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <button onClick={() => { setFiltreD("Tous"); setFiltreR("Toutes"); }} style={{ marginTop: "18px", background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "14px" }}>
            ↺ Réinitialiser
          </button>
        </div>

        <p style={{ color: "#6b7280", marginBottom: "30px", fontSize: "14px", fontWeight: "600", letterSpacing: "1px" }}>
          {filtres.length} ITINÉRAIRE{filtres.length > 1 ? "S" : ""} TROUVÉ{filtres.length > 1 ? "S" : ""}
        </p>

        {loading ? (
          <p>Chargement des itinéraires...</p>
        ) : filtres.length === 0 ? (
          <p style={{ color: "#6b7280" }}>Aucun itinéraire trouvé.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
            {filtres.map(route => (
              <HikingRoute key={route.id} {...route} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Routes;
