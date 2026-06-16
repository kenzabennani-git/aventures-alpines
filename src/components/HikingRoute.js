function HikingRoute({ titre, region, distance, difficulte, duree, denivele, depart, description, image_url }) {
  const couleurs = {
    Difficile: { bg: "#fee2e2", color: "#dc2626" },
    Moyen: { bg: "#fef3c7", color: "#d97706" },
    Facile: { bg: "#d1fae5", color: "#059669" }
  };

  const c = couleurs[difficulte] || { bg: "#e5e7eb", color: "#374151" };

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", background: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
      <div style={{ position: "relative" }}>
        <img src={image_url} alt={titre} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
        <span style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(0,0,0,0.6)", color: "white", padding: "6px 12px", borderRadius: "999px", fontSize: "13px", fontWeight: "600" }}>
          📍 {region}
        </span>
        <span style={{ position: "absolute", bottom: "14px", right: "14px", background: c.bg, color: c.color, padding: "6px 14px", borderRadius: "999px", fontSize: "13px", fontWeight: "600" }}>
          {difficulte}
        </span>
      </div>

      <div style={{ padding: "22px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>{titre}</h3>
        <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: "1.6", marginBottom: "18px" }}>{description}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", borderTop: "1px solid #e5e7eb", paddingTop: "16px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600", letterSpacing: "1px" }}>DURÉE</div>
            <div style={{ fontWeight: "600", marginTop: "4px" }}>{duree}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600", letterSpacing: "1px" }}>DISTANCE</div>
            <div style={{ fontWeight: "600", marginTop: "4px" }}>{distance}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600", letterSpacing: "1px" }}>DÉNIVELÉ</div>
            <div style={{ fontWeight: "600", marginTop: "4px" }}>{denivele}</div>
          </div>
        </div>

        <div style={{ marginTop: "14px", color: "#6b7280", fontSize: "14px" }}>
          🚩 Départ : <strong>{depart}</strong>
        </div>
      </div>
    </div>
  );
}

export default HikingRoute;
