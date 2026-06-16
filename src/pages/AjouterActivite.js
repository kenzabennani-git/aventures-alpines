import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AjouterActivite() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [niveau, setNiveau] = useState("");
  const [saison, setSaison] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categorie, setCategorie] = useState("");
  const [succes, setSucces] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/activites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          description,
          niveau_difficulte: niveau,
          saison_recommandee: saison,
          image_url: imageUrl,
          categorie
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Erreur : " + data.error);
        return;
      }

      setSucces(true);
      setNom("");
      setDescription("");
      setNiveau("");
      setSaison("");
      setImageUrl("");
      setCategorie("");

      setTimeout(() => {
        setSucces(false);
        navigate("/activites");
      }, 2000);

    } catch (err) {
      console.log("Erreur fetch :", err);
      alert("Impossible de contacter le serveur");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "60px 20px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "42px", marginBottom: "8px" }}>➕ Ajouter une activité</h1>
          <p style={{ color: "#6b7280" }}>Remplissez le formulaire pour ajouter une nouvelle activité au site.</p>
        </div>

        {/* MESSAGE SUCCES */}
        {succes && (
          <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", padding: "16px", borderRadius: "10px", marginBottom: "24px", color: "#166534", fontWeight: "500" }}>
            ✅ Activité ajoutée avec succès ! Redirection en cours...
          </div>
        )}

        {/* FORMULAIRE */}
        <div style={{ background: "white", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
          <form onSubmit={handleSubmit}>

            <div style={fieldGroup}>
              <label style={labelStyle}>Nom de l'activité *</label>
              <input
                type="text"
                placeholder="Ex : Randonnée au Lac Blanc"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div style={fieldGroup}>
              <label style={labelStyle}>Description *</label>
              <textarea
                placeholder="Décrivez l'activité en quelques phrases..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ ...inputStyle, height: "120px", resize: "vertical" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={fieldGroup}>
                <label style={labelStyle}>Niveau de difficulté *</label>
                <select value={niveau} onChange={(e) => setNiveau(e.target.value)} required style={inputStyle}>
                  <option value="">Choisir...</option>
                  <option value="Facile">Facile</option>
                  <option value="Moyen">Moyen</option>
                  <option value="Difficile">Difficile</option>
                  <option value="Expérimenté">Expérimenté</option>
                </select>
              </div>

              <div style={fieldGroup}>
                <label style={labelStyle}>Catégorie *</label>
                <select value={categorie} onChange={(e) => setCategorie(e.target.value)} required style={inputStyle}>
                  <option value="">Choisir...</option>
                  <option value="randonnee">Randonnée</option>
                  <option value="escalade">Escalade</option>
                  <option value="ski">Ski</option>
                </select>
              </div>
            </div>

            <div style={fieldGroup}>
              <label style={labelStyle}>Saison recommandée</label>
              <select value={saison} onChange={(e) => setSaison(e.target.value)} style={inputStyle}>
                <option value="">Choisir...</option>
                <option value="Été">Été</option>
                <option value="Hiver">Hiver</option>
                <option value="Printemps">Printemps</option>
                <option value="Automne">Automne</option>
                <option value="Toutes saisons">Toutes saisons</option>
              </select>
            </div>

            <div style={fieldGroup}>
              <label style={labelStyle}>URL de l'image</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={inputStyle}
              />
              {imageUrl && (
                <img src={imageUrl} alt="preview" style={{ marginTop: "10px", width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
              )}
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
              <button type="submit" style={submitBtn}>
                ➕ Ajouter l'activité
              </button>
              <button type="button" onClick={() => navigate("/activites")} style={cancelBtn}>
                Annuler
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

const fieldGroup = { display: "flex", flexDirection: "column", marginBottom: "20px" };

const labelStyle = {
  fontWeight: "600", marginBottom: "8px", color: "#374151",
  fontSize: "14px", letterSpacing: "0.5px"
};

const inputStyle = {
  padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: "10px",
  fontSize: "15px", color: "#374151", background: "white", width: "100%", boxSizing: "border-box"
};

const submitBtn = {
  flex: 1, background: "#2f5d4e", color: "white", border: "none",
  padding: "14px 20px", borderRadius: "10px", cursor: "pointer",
  fontSize: "16px", fontWeight: "600"
};

const cancelBtn = {
  background: "white", color: "#374151", border: "1px solid #d1d5db",
  padding: "14px 20px", borderRadius: "10px", cursor: "pointer",
  fontSize: "16px", fontWeight: "500"
};

export default AjouterActivite;


