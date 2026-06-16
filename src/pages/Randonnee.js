import { useEffect, useState } from "react";
import HikingRoute from "../components/HikingRoute";

function Randonnee() {
  const images = [
    "https://hillmont.tw/wp-content/uploads/2022/04/%E5%A4%8F%E6%85%95%E5%B0%BC%E5%81%A5%E8%A1%8C.jpg",
    "https://live.staticflickr.com/2942/15185222338_eb8a0c6f76_b.jpg",
    "https://i.pinimg.com/originals/6e/99/95/6e9995f9715e2e7ed91ea3badd308474.jpg",
    "https://tourdumontblanchike.com/wp-content/uploads/2021/03/hiking-the-tmb-with-kids.jpg",
    "https://cdn.charitychallenge.com/images/library/Mont_Blanc_Banner_1_@2x.jpg"
  ];

  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("informations");
  const [selectedRando, setSelectedRando] = useState(null);
  const [reservationEnvoyee, setReservationEnvoyee] = useState(false);
  const [randonnees, setRandonnees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itineraires, setItineraires] = useState([]);
  const [loadingIti, setLoadingIti] = useState(true);
  const [filtreD, setFiltreD] = useState("Tous");
  const [filtreR, setFiltreR] = useState("Toutes");

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    date: "",
    personnes: 1
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/offres-randonne")
      .then((res) => res.json())
      .then((data) => {
        setRandonnees(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Erreur récupération randonnées :", err);
        setLoading(false);
      });

    fetch("http://localhost:5000/api/itineraires")
      .then((res) => res.json())
      .then((data) => {
        setItineraires(Array.isArray(data) ? data : []);
        setLoadingIti(false);
      })
      .catch(() => setLoadingIti(false));
  }, []);

  const regions = ["Toutes", ...new Set(itineraires.map(i => i.region))];
  const difficultes = ["Tous", "Facile", "Moyen", "Difficile"];

  const itinerairesFiltres = itineraires.filter(i => {
    const okD = filtreD === "Tous" || i.difficulte === filtreD;
    const okR = filtreR === "Toutes" || i.region === filtreR;
    return okD && okR;
  });

  const next = () => setIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prev = () => setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  function ouvrirReservation(rando) {
    setSelectedRando(rando);
    setReservationEnvoyee(false);
    setFormData({ nom: "", email: "", date: "", personnes: 1 });
  }

  function fermerReservation() {
    setSelectedRando(null);
    setReservationEnvoyee(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleReservation(e) {
    e.preventDefault();
    let user = null;
    try { user = JSON.parse(localStorage.getItem("user")); } catch {}

    if (!user) {
      alert("Vous devez être connecté pour réserver !");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utilisateur_id: user.id,
          activite_nom: selectedRando.titre,
          date_debut: formData.date,
          date_fin: formData.date,
          nb_personnes: formData.personnes,
          prix: selectedRando.prix * formData.personnes
        })
      });
      const data = await res.json();
      if (data.error) {
        alert("Erreur : " + data.error);
      } else {
        setReservationEnvoyee(true);
      }
    } catch (err) {
      console.log(err);
      alert("Erreur serveur");
    }
  }

  return (
    <div>
      <div style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://www.kayak.fr/news/wp-content/uploads/sites/7/2022/01/dest_france_pyrenees_midi-d-ossau_gettyimages-583802480_universal_within-usage-period_81826.jpg')",
        height: "420px", backgroundSize: "cover", backgroundPosition: "center",
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", color: "white", textAlign: "center"
      }}>
        <h1 style={{ fontSize: "70px" }}>Randonnée</h1>
        <p style={{ fontSize: "22px" }}>Parcourez les sentiers alpins les plus spectaculaires.</p>
      </div>

      {/* ONGLETS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #d1d5db", maxWidth: "1300px", margin: "0 auto" }}>
        <button onClick={() => setActiveTab("informations")} style={activeTab === "informations" ? activeTabStyle : tabStyle}>INFORMATIONS</button>
        <button onClick={() => setActiveTab("itineraires")} style={activeTab === "itineraires" ? activeTabStyle : tabStyle}>ITINÉRAIRES</button>
        <button onClick={() => setActiveTab("randonnees")} style={activeTab === "randonnees" ? activeTabStyle : tabStyle}>RANDONNÉES</button>
      </div>

      {/* INFORMATIONS */}
      {activeTab === "informations" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1200px", margin: "80px auto" }}>
            <div>
              <h2 style={{ fontSize: "40px", marginBottom: "8px" }}>Équipement recommandé</h2>
              <p style={{ color: "#6b7280", marginBottom: "25px" }}>Préparez-vous correctement pour profiter pleinement de chaque sortie en toute sécurité.</p>
              {equip("🎒", "Sac à dos 30-50L", "Adapté à la durée de la randonnée")}
              {equip("🥾", "Chaussures de randonnée", "Montantes, imperméables, avec bon maintien")}
              {equip("☀️", "Protection solaire", "Crème solaire, lunettes, chapeau")}
              {equip("📍", "Carte & boussole", "Toujours avoir un moyen de navigation")}
            </div>
            <div>
              <h2 style={{ fontSize: "40px", marginBottom: "8px" }}>Meilleures saisons</h2>
              <p style={{ color: "#6b7280", marginBottom: "25px" }}>Chaque saison offre une expérience unique en montagne. Planifiez au bon moment.</p>
              {season("☀️", "Été (Juin-Sept)", "Saison idéale : sentiers dégagés, longues journées", "#f59e0b")}
              {season("🍂", "Automne (Sept-Nov)", "Couleurs magnifiques, moins de monde", "#ef4444")}
              {season("❄️", "Hiver (Déc-Mars)", "Raquettes nécessaires, paysages féeriques", "#3b82f6")}
            </div>
          </div>

          <div style={{ maxWidth: "1200px", margin: "80px auto" }}>
            <h2 style={{ textAlign: "center", fontSize: "40px" }}>Carte des sentiers</h2>
            <p style={{ textAlign: "center", color: "#666" }}>
              Carte interactive affichant les sentiers de randonnée populaires avec des points d'intérêt.
            </p>
            <div style={{ borderRadius: "12px", overflow: "hidden" }}>
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1V9kTsA9kEGjLdc6nlbHBOB4WwzOIOuE&ehbc=2E312F"
                width="100%" height="450" style={{ border: "none" }} title="Carte"
              />
            </div>
          </div>

          <div style={{ maxWidth: "1100px", margin: "80px auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "40px" }}>Galerie photos</h2>
            <p style={{ color: "#666" }}>Revivez les moments forts de nos randonnées passées à travers ces photos capturées par nos guides et participants.</p>
            <div style={{ position: "relative", marginTop: "30px" }}>
              <img src={images[index]} alt="randonnee"
                onError={(e) => { e.target.src = images[0]; }}
                style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "12px" }}
              />
              <button onClick={prev} style={arrowLeft}>‹</button>
              <button onClick={next} style={arrowRight}>›</button>
            </div>
            <div style={{ marginTop: "20px" }}>
              {images.map((_, i) => (
                <span key={i} onClick={() => setIndex(i)} style={{
                  display: "inline-block", width: "12px", height: "12px", borderRadius: "50%",
                  margin: "0 6px", background: i === index ? "#2e7d32" : "#ccc", cursor: "pointer"
                }} />
              ))}
            </div>
          </div>
        </>
      )}

      {/* ITINERAIRES */}
      {activeTab === "itineraires" && (
        <div style={{ maxWidth: "1200px", margin: "50px auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "42px", marginBottom: "10px" }}>Nos Itinéraires</h2>
          <p style={{ color: "#6b7280", marginBottom: "35px" }}>Découvrez nos parcours en autonomie dans les plus beaux massifs alpins.</p>

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
            {itinerairesFiltres.length} ITINÉRAIRE{itinerairesFiltres.length > 1 ? "S" : ""} TROUVÉ{itinerairesFiltres.length > 1 ? "S" : ""}
          </p>

          {loadingIti ? (
            <p>Chargement des itinéraires...</p>
          ) : itinerairesFiltres.length === 0 ? (
            <p style={{ color: "#6b7280" }}>Aucun itinéraire trouvé.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
              {itinerairesFiltres.map(route => (
                <HikingRoute key={route.id} {...route} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* RANDONNEES */}
      {activeTab === "randonnees" && (
        <div style={{ maxWidth: "1200px", margin: "70px auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "42px", marginBottom: "10px" }}>Nos randonnées accompagnées</h2>
          <p style={{ color: "#6b7280", marginBottom: "35px", maxWidth: "850px" }}>
            Réservez votre randonnée avec nos guides professionnels. Nos parcours sont pensés pour offrir une expérience immersive, sécurisée et adaptée à chaque niveau.
          </p>

          {loading ? (
            <p>Chargement des randonnées...</p>
          ) : randonnees.length === 0 ? (
            <p>Aucune randonnée trouvée.</p>
          ) : (
            <div style={cardsGrid}>
              {randonnees.map((rando) => (
                <div key={rando.id} style={randoCard}>
                  <div style={{ position: "relative" }}>
                    <img src={rando.image_url} alt={rando.titre} style={randoImage} />
                    <span style={difficultyBadge(rando.difficulte)}>{rando.difficulte}</span>
                    {Number(rando.guide_inclus) === 1 && <span style={guideBadge}>Guide inclus</span>}
                  </div>
                  <div style={randoContent}>
                    <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>{rando.titre}</h3>
                    <p style={{ color: "#6b7280", marginBottom: "18px", lineHeight: "1.5" }}>{rando.description}</p>
                    <div style={infoRow}>
                      <span style={infoItem}>📍 {rando.lieu}</span>
                      <span style={infoItem}>⏱ {rando.duree}</span>
                    </div>
                    <div style={infoRowBottom}>
                      <span style={infoItem}>👥 Max {rando.max_personnes} pers.</span>
                    </div>
                    <div style={priceRow}>
                      <strong style={{ fontSize: "28px" }}>{Number(rando.prix).toFixed(2)}€ / pers.</strong>
                      <button style={reserveButton} onClick={() => ouvrirReservation(rando)}>Réserver</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL RESERVATION */}
      {selectedRando && (
        <div style={overlay}>
          <div style={modal}>
            <div style={reservationHeader}>
              <div>
                <h3 style={{ marginBottom: "6px", fontSize: "34px" }}>Réserver : {selectedRando.titre}</h3>
                <p style={{ color: "#6b7280" }}>Complétez ce formulaire pour finaliser votre réservation.</p>
              </div>
              <button onClick={fermerReservation} style={closeButton}>✕</button>
            </div>

            {!reservationEnvoyee ? (
              <form onSubmit={handleReservation} style={reservationForm}>
                <div style={fieldGroup}>
                  <label style={label}>Nom complet</label>
                  <input type="text" name="nom" placeholder="Entrez votre nom complet" value={formData.nom} onChange={handleChange} required style={input} />
                </div>
                <div style={fieldGroup}>
                  <label style={label}>Adresse email</label>
                  <input type="email" name="email" placeholder="Entrez votre email" value={formData.email} onChange={handleChange} required style={input} />
                </div>
                <div style={fieldGroup}>
                  <label style={label}>Date souhaitée</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required style={input} />
                </div>
                <div style={fieldGroup}>
                  <label style={label}>Nombre de personnes</label>
                  <input type="number" name="personnes" min="1" max={selectedRando.max_personnes} value={formData.personnes} onChange={handleChange} required style={input} />
                </div>
                <button type="submit" style={submitButton}>Confirmer la réservation</button>
              </form>
            ) : (
              <div style={successBox}>
                <h4 style={{ fontSize: "24px", marginBottom: "10px" }}>Réservation confirmée ✅</h4>
                <p style={{ color: "#166534", lineHeight: "1.6" }}>
                  Merci {formData.nom}, votre demande pour <strong>{selectedRando.titre}</strong> a bien été enregistrée pour le <strong>{formData.date}</strong>.
                </p>
                <button onClick={fermerReservation} style={submitButton}>Fermer</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* STYLES */

const tabStyle = {
  background: "white", border: "none", borderBottom: "3px solid transparent",
  padding: "32px 20px", fontSize: "28px", letterSpacing: "2px",
  color: "#6b7280", cursor: "pointer", fontWeight: "400"
};

const activeTabStyle = {
  background: "white", border: "none", borderBottom: "3px solid black",
  padding: "32px 20px", fontSize: "28px", letterSpacing: "2px",
  color: "black", cursor: "pointer", fontWeight: "400"
};

const cardsGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" };

const randoCard = { border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", background: "white", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" };

const randoImage = { width: "100%", height: "230px", objectFit: "cover" };

const randoContent = { padding: "22px" };

const infoRow = { display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#6b7280", flexWrap: "wrap", gap: "10px" };

const infoRowBottom = { marginBottom: "18px", color: "#6b7280" };

const infoItem = { fontSize: "15px" };

const priceRow = { display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e5e7eb", paddingTop: "18px", marginTop: "10px" };

const reserveButton = { background: "black", color: "white", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" };

const overlay = { position: "fixed", inset: "0", background: "rgba(0,0,0,0.55)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 3000, padding: "20px" };

const modal = { background: "white", width: "100%", maxWidth: "900px", borderRadius: "18px", padding: "30px", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" };

const reservationHeader = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", marginBottom: "24px" };

const closeButton = { background: "transparent", border: "none", fontSize: "28px", cursor: "pointer" };

const reservationForm = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" };

const fieldGroup = { display: "flex", flexDirection: "column" };

const label = { fontWeight: "600", marginBottom: "8px", color: "#1f2937" };

const input = { padding: "14px", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "15px" };

const submitButton = { gridColumn: "1 / -1", background: "#2f5d4e", color: "white", border: "none", padding: "14px 20px", borderRadius: "10px", cursor: "pointer", fontSize: "16px", fontWeight: "600", marginTop: "10px" };

const successBox = { background: "#dcfce7", border: "1px solid #bbf7d0", padding: "20px", borderRadius: "12px" };

function difficultyBadge(level) {
  return { position: "absolute", top: "14px", right: "14px", background: "#374151", color: "white", padding: "10px 16px", borderRadius: "999px", fontSize: "14px", fontWeight: "600" };
}

const guideBadge = { position: "absolute", bottom: "14px", left: "14px", background: "#374151", color: "white", padding: "10px 16px", borderRadius: "999px", fontSize: "14px", fontWeight: "600" };

function equip(icon, title, text) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "18px", background: "#f9fafb", padding: "18px", borderRadius: "12px", marginBottom: "16px", border: "1px solid #e5e7eb" }}>
      <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{icon}</div>
      <div>
        <div style={{ fontWeight: "600" }}>{title}</div>
        <div style={{ color: "#6b7280", fontSize: "14px" }}>{text}</div>
      </div>
    </div>
  );
}

function season(icon, title, text, color) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "18px", background: "#f9fafb", padding: "18px", borderRadius: "12px", marginBottom: "16px", border: "1px solid #e5e7eb" }}>
      <div style={{ fontSize: "22px", color: color }}>{icon}</div>
      <div>
        <div style={{ fontWeight: "600" }}>{title}</div>
        <div style={{ color: "#6b7280", fontSize: "14px" }}>{text}</div>
      </div>
    </div>
  );
}

const arrowLeft = { position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "white", border: "none", borderRadius: "50%", width: "45px", height: "45px", fontSize: "25px", cursor: "pointer" };

const arrowRight = { position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "white", border: "none", borderRadius: "50%", width: "45px", height: "45px", fontSize: "25px", cursor: "pointer" };

export default Randonnee;