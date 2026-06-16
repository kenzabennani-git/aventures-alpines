import { useState } from "react";

function Escalade() {
  const [activeTab, setActiveTab] = useState("informations");
  const [selectedEscalade, setSelectedEscalade] = useState(null);
  const [reservationEnvoyee, setReservationEnvoyee] = useState(false);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    date: "",
    personnes: 1
  });

  const sites = [
    { name: "Aiguille du Midi", level: "Expérimenté", time: "6-8h", location: "Chamonix" },
    { name: "Les Gaillands", level: "Facile", time: "2-3h", location: "Chamonix" },
    { name: "Presles", level: "Moyen", time: "4-5h", location: "Vercors" },
    { name: "Céüse", level: "Difficile", time: "5-7h", location: "Hautes-Alpes" },
    { name: "Calanques de Marseille", level: "Moyen", time: "3-4h", location: "Bouches-du-Rhône" }
  ];

  const beginnerTips = [
    "Commencez par des voies d'initiation en salle avant de passer à la falaise",
    "Investissez dans un bon baudrier, des chaussons et un casque certifiés",
    "Apprenez les nœuds essentiels : nœud de huit, nœud de cabestan",
    "Grimpez toujours avec un partenaire expérimenté",
    "Échauffez-vous correctement avant chaque session",
    "Respectez la cotation des voies et progressez graduellement"
  ];

  const safetyRules = [
    "Vérifiez systématiquement votre équipement avant chaque ascension",
    "Consultez la météo et évitez de grimper par temps d'orage",
    "Faites vérifier vos nœuds par votre partenaire"
  ];

  const videos = [
    {
      title: "Escalade à Chamonix – Aiguille du Midi",
      url: "https://www.youtube.com/embed/vZBewNyD2WI",
      desc: "Découvrez l'ascension spectaculaire de l'Aiguille du Midi avec nos grimpeurs."
    },
    {
      title: "Initiation escalade – Les bases",
      url: "https://www.youtube.com/embed/y0eIli_5XE8",
      desc: "Apprenez les techniques fondamentales de l'escalade en toute sécurité."
    },
    {
      title: "Escalade en grande voie – Céüse",
      url: "https://www.youtube.com/embed/95LKMVMPy1U",
      desc: "Une grande voie mythique dans les Hautes-Alpes filmée par nos experts."
    }
  ];

  const escalades = [
    {
      id: 1,
      titre: "Grande voie découverte des Gaillands",
      description:
        "Une sortie idéale pour découvrir l'escalade en falaise sur un site emblématique de Chamonix, avec progression pas à pas sur des voies accessibles.",
      lieu: "Chamonix - Les Gaillands",
      type_escalade: "Grande voie initiation",
      difficulte: "Facile",
      hauteur: "35 m",
      longueur: "120 m",
      duree: "3h30",
      prix: "55.00€ / pers.",
      guide_inclus: true,
      materiel_inclus: true,
      niveau_requis: "Débutant",
      image_url: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=80",
      date_debut: "Mai 2026",
      date_fin: "Septembre 2026"
    },
    {
      id: 2,
      titre: "Parcours technique à Presles",
      description:
        "Une session encadrée sur un site réputé du Vercors, idéale pour progresser en lecture de voie, gestion des mouvements et assurance en extérieur.",
      lieu: "Presles - Vercors",
      type_escalade: "Falaise sportive",
      difficulte: "Moyen",
      hauteur: "80 m",
      longueur: "180 m",
      duree: "5h",
      prix: "85.00€ / pers.",
      guide_inclus: true,
      materiel_inclus: false,
      niveau_requis: "Intermédiaire",
      image_url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      date_debut: "Avril 2026",
      date_fin: "Octobre 2026"
    },
    {
      id: 3,
      titre: "Ascension engagée à Céüse",
      description:
        "Une expérience exigeante sur l'un des plus beaux sites d'escalade en France, réservée aux grimpeurs confirmés souhaitant repousser leurs limites.",
      lieu: "Céüse - Hautes-Alpes",
      type_escalade: "Grande voie sportive",
      difficulte: "Difficile",
      hauteur: "150 m",
      longueur: "320 m",
      duree: "7h",
      prix: "130.00€ / pers.",
      guide_inclus: true,
      materiel_inclus: true,
      niveau_requis: "Confirmé",
      image_url: "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?auto=format&fit=crop&w=1600&q=80",
      date_debut: "Juin 2026",
      date_fin: "Septembre 2026"
    }
  ];

  function ouvrirReservation(escalade) {
    setSelectedEscalade(escalade);
    setReservationEnvoyee(false);
    setFormData({
      nom: "",
      email: "",
      date: "",
      personnes: 1
    });
  }

  function fermerReservation() {
    setSelectedEscalade(null);
    setReservationEnvoyee(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }


  
  async function handleReservation(e) {
  e.preventDefault();

  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch {}

  if (!user) {
    alert("Vous devez être connecté pour réserver !");
    return;
  }

  const prixNumber = parseFloat(selectedEscalade.prix.replace("€ / pers.", "").replace(",", ".").trim());

  try {
    const res = await fetch("http://localhost:5000/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        utilisateur_id: user.id,
        activite_nom: selectedEscalade.titre,
        date_debut: formData.date,
        date_fin: formData.date,
        nb_personnes: formData.personnes,
        prix: prixNumber * formData.personnes
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
      {/* HERO */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=80')",
          height: "420px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center"
        }}
      >
        <h1 style={{ fontSize: "70px" }}>Escalade</h1>

        <p style={{ fontSize: "22px" }}>
          Grimpez les parois les plus emblématiques des Alpes.
        </p>
      </div>

      {/* ONGLETS */}
      <div style={tabsWrapper}>
        <button
          onClick={() => setActiveTab("informations")}
          style={activeTab === "informations" ? activeTabStyle : tabStyle}
        >
          INFORMATIONS
        </button>

        <button
          onClick={() => setActiveTab("sites")}
          style={activeTab === "sites" ? activeTabStyle : tabStyle}
        >
          SITES D'ESCALADE
        </button>

        <button
          onClick={() => setActiveTab("escalade")}
          style={activeTab === "escalade" ? activeTabStyle : tabStyle}
        >
          ESCALADE
        </button>
      </div>

      {/* INFORMATIONS */}
      {activeTab === "informations" && (
        <>
          {/* DEBUTER */}
          <section style={{ maxWidth: "1000px", margin: "80px auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h2 style={{ fontSize: "36px" }}>Débuter l'escalade</h2>

              <p style={{ color: "#6b7280" }}>
                L'escalade est un sport accessible à tous. Voici nos conseils pour bien démarrer.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px"
              }}
            >
              <div
                style={{
                  background: "#f9fafb",
                  padding: "25px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb"
                }}
              >
                <h3 style={{ marginBottom: "15px" }}>Conseils pour débutants</h3>

                <ul style={{ paddingLeft: "20px", color: "#6b7280" }}>
                  {beginnerTips.map((tip, i) => (
                    <li key={i} style={{ marginBottom: "10px" }}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  background: "#f9fafb",
                  padding: "25px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb"
                }}
              >
                <h3 style={{ marginBottom: "15px" }}>Règles de sécurité</h3>

                <ul style={{ paddingLeft: "20px", color: "#6b7280" }}>
                  {safetyRules.map((rule, i) => (
                    <li key={i} style={{ marginBottom: "10px" }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* VIDEOS */}
          <section style={{ maxWidth: "1100px", margin: "80px auto" }}>
            <h2 style={{ textAlign: "center", fontSize: "36px" }}>
              Vidéos d'escalade
            </h2>

            <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "40px" }}>
              Regardez nos grimpeurs en action sur les plus belles parois.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "25px"
              }}
            >
              {videos.map((video, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <div style={{ width: "100%", height: "180px" }}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px"
                      }}
                    ></iframe>
                  </div>

                  <div style={{ padding: "15px" }}>
                    <h4 style={{ marginBottom: "5px" }}>{video.title}</h4>

                    <p style={{ color: "#6b7280", fontSize: "14px" }}>
                      {video.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECURITE */}
          <section style={{ maxWidth: "700px", margin: "80px auto" }}>
            <div
              style={{
                background: "#f9fafb",
                padding: "25px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                display: "flex",
                gap: "15px"
              }}
            >
              <div style={{ fontSize: "28px" }}>🛡</div>

              <div>
                <h3 style={{ marginBottom: "5px" }}>Sécurité avant tout</h3>

                <p style={{ color: "#6b7280" }}>
                  Tous nos sites sont inspectés régulièrement. Nous recommandons de toujours
                  grimper avec un équipement certifié et de partir encadré sur les parcours
                  techniques ou en grande voie.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* SITES */}
      {/* SITES D'ESCALADE */}
{activeTab === "sites" && (
  <section style={{ maxWidth: "1200px", margin: "80px auto" }}>
    <div style={{ textAlign: "center", marginBottom: "40px" }}>
      <h2 style={{ fontSize: "38px", marginBottom: "10px" }}>
        Découvrez les plus beaux sites d'escalade
      </h2>

      <p
        style={{
          color: "#6b7280",
          maxWidth: "760px",
          margin: "0 auto",
          lineHeight: "1.7"
        }}
      >
        Des falaises accessibles aux spots les plus mythiques, explorez des lieux
        d’exception pour vivre l’escalade sous toutes ses formes.
      </p>
    </div>

    <div style={cardsGrid}>
      {[
        {
          id: 1,
          titre: "Les Gaillands",
          region: "Haute-Savoie",
          niveau: "Facile",
          description:
            "Un site emblématique de Chamonix, parfait pour découvrir l’escalade en extérieur dans un cadre alpin accessible et rassurant.",
          image:
            "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=80"
        },
        {
          id: 2,
          titre: "Presles",
          region: "Vercors",
          niveau: "Moyen",
          description:
            "Un haut lieu de la falaise française, apprécié pour la variété de ses voies et la qualité de son environnement naturel.",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
        },
        {
          id: 3,
          titre: "Céüse",
          region: "Hautes-Alpes",
          niveau: "Difficile",
          description:
            "Un spot mythique pour les grimpeurs confirmés, réputé pour ses lignes exigeantes et son caractère spectaculaire.",
          image:
            "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?auto=format&fit=crop&w=1600&q=80"
        }
      ].map((site) => (
        <div key={site.id} style={card}>
          <div style={{ position: "relative" }}>
            <img src={site.image} alt={site.titre} style={cardImage} />

            <span style={topBadge(site.niveau)}>
              {site.niveau}
            </span>
          </div>

          <div style={cardContent}>
            <h3 style={{ fontSize: "24px", marginBottom: "10px" }}>
              {site.titre}
            </h3>

            <p style={cardDescription}>{site.description}</p>

            <div style={infoBlock}>
              <div style={infoRow}>
                <span style={infoLabel}>Région :</span>
                <span>{site.region}</span>
              </div>

              <div style={infoRow}>
                <span style={infoLabel}>Niveau :</span>
                <span>{site.niveau}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)}



      {/* ESCALADE */}
      {activeTab === "escalade" && (
        <section style={{ maxWidth: "1200px", margin: "80px auto" }}>
          <h2 style={{ fontSize: "40px", marginBottom: "10px" }}>
            Sorties et expériences escalade
          </h2>

          <p style={{ color: "#6b7280", marginBottom: "35px", maxWidth: "850px" }}>
            Choisissez une sortie adaptée à votre niveau, du parcours découverte à
            l’ascension engagée en grande voie, avec encadrement professionnel.
          </p>

          <div style={cardsGrid}>
            {escalades.map((item) => (
              <div key={item.id} style={card}>
                <div style={{ position: "relative" }}>
                  <img src={item.image_url} alt={item.titre} style={cardImage} />

                  <span style={topBadge(item.difficulte)}>
                    {item.difficulte}
                  </span>

                  {item.guide_inclus && (
                    <span style={bottomBadge}>
                      Guide inclus
                    </span>
                  )}
                </div>

                <div style={cardContent}>
                  <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>
                    {item.titre}
                  </h3>

                  <p style={cardDescription}>{item.description}</p>

                  <div style={infoBlock}>
                    <div style={infoRow}>
                      <span style={infoLabel}>Lieu :</span>
                      <span>{item.lieu}</span>
                    </div>

                    <div style={infoRow}>
                      <span style={infoLabel}>Type :</span>
                      <span>{item.type_escalade}</span>
                    </div>

                    <div style={infoRow}>
                      <span style={infoLabel}>Hauteur :</span>
                      <span>{item.hauteur}</span>
                    </div>

                    <div style={infoRow}>
                      <span style={infoLabel}>Longueur :</span>
                      <span>{item.longueur}</span>
                    </div>

                    <div style={infoRow}>
                      <span style={infoLabel}>Durée :</span>
                      <span>{item.duree}</span>
                    </div>

                    <div style={infoRow}>
                      <span style={infoLabel}>Niveau requis :</span>
                      <span>{item.niveau_requis}</span>
                    </div>

                    <div style={infoRow}>
                      <span style={infoLabel}>Matériel :</span>
                      <span>{item.materiel_inclus ? "Inclus" : "Non inclus"}</span>
                    </div>

                    <div style={infoRow}>
                      <span style={infoLabel}>Disponible :</span>
                      <span>{item.date_debut} → {item.date_fin}</span>
                    </div>
                  </div>

                  <div style={priceRow}>
                    <strong style={{ fontSize: "28px" }}>{item.prix}</strong>

                    <button
                      style={reserveButton}
                      onClick={() => ouvrirReservation(item)}
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* POP UP RESERVATION */}
      {selectedEscalade && (
        <div style={overlay}>
          <div style={modal}>
            <div style={reservationHeader}>
              <div>
                <h3 style={{ marginBottom: "6px", fontSize: "34px" }}>
                  Réserver : {selectedEscalade.titre}
                </h3>
                <p style={{ color: "#6b7280" }}>
                  Complétez ce formulaire pour finaliser votre réservation.
                </p>
              </div>

              <button onClick={fermerReservation} style={closeButton}>
                ✕
              </button>
            </div>

            {!reservationEnvoyee ? (
              <form onSubmit={handleReservation} style={reservationForm}>
                <div style={fieldGroup}>
                  <label style={label}>Nom complet</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Entrez votre nom complet"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    style={input}
                  />
                </div>

                <div style={fieldGroup}>
                  <label style={label}>Adresse email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Entrez votre email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={input}
                  />
                </div>

                <div style={fieldGroup}>
                  <label style={label}>Date souhaitée</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    style={input}
                  />
                </div>

                <div style={fieldGroup}>
                  <label style={label}>Nombre de personnes</label>
                  <input
                    type="number"
                    name="personnes"
                    min="1"
                    max="6"
                    value={formData.personnes}
                    onChange={handleChange}
                    required
                    style={input}
                  />
                </div>

                <button type="submit" style={submitButton}>
                  Confirmer la réservation
                </button>
              </form>
            ) : (
              <div style={successBox}>
                <h4 style={{ fontSize: "24px", marginBottom: "10px" }}>
                  Réservation confirmée ✅
                </h4>

                <p style={{ color: "#166534", lineHeight: "1.6" }}>
                  Merci {formData.nom}, votre demande pour <strong>{selectedEscalade.titre}</strong> a bien été enregistrée pour le <strong>{formData.date}</strong>.
                </p>

                <button onClick={fermerReservation} style={submitButton}>
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function badge(level) {
  const colors = {
    Facile: { bg: "#d1fae5", color: "#059669" },
    Moyen: { bg: "#fef3c7", color: "#d97706" },
    Difficile: { bg: "#fee2e2", color: "#dc2626" },
    Expérimenté: { bg: "#e5e7eb", color: "#374151" }
  };

  return {
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600",
    background: colors[level].bg,
    color: colors[level].color
  };
}

function topBadge(level) {
  return {
    position: "absolute",
    top: "14px",
    right: "14px",
    background:
      level === "Facile"
        ? "#059669"
        : level === "Moyen"
        ? "#d97706"
        : "#dc2626",
    color: "white",
    padding: "10px 16px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "600"
  };
}

const bottomBadge = {
  position: "absolute",
  bottom: "14px",
  left: "14px",
  background: "#111827",
  color: "white",
  padding: "10px 16px",
  borderRadius: "999px",
  fontSize: "14px",
  fontWeight: "600"
};

const tabsWrapper = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  borderBottom: "1px solid #d1d5db",
  maxWidth: "1300px",
  margin: "0 auto"
};

const tabStyle = {
  background: "white",
  border: "none",
  borderBottom: "3px solid transparent",
  padding: "28px 15px",
  fontSize: "24px",
  letterSpacing: "1px",
  color: "#6b7280",
  cursor: "pointer",
  fontWeight: "400"
};

const activeTabStyle = {
  background: "white",
  border: "none",
  borderBottom: "3px solid black",
  padding: "28px 15px",
  fontSize: "24px",
  letterSpacing: "1px",
  color: "black",
  cursor: "pointer",
  fontWeight: "400"
};

const cardsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  gap: "30px"
};

const card = {
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  overflow: "hidden",
  background: "white",
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
};

const cardImage = {
  width: "100%",
  height: "240px",
  objectFit: "cover"
};

const cardContent = {
  padding: "24px"
};

const cardDescription = {
  color: "#6b7280",
  lineHeight: "1.7",
  marginBottom: "18px"
};

const infoBlock = {
  borderTop: "1px solid #e5e7eb",
  borderBottom: "1px solid #e5e7eb",
  padding: "16px 0",
  marginBottom: "20px"
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "15px",
  marginBottom: "12px",
  color: "#374151"
};

const infoLabel = {
  fontWeight: "600"
};

const priceRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const reserveButton = {
  background: "black",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600"
};

const overlay = {
  position: "fixed",
  inset: "0",
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 3000,
  padding: "20px"
};

const modal = {
  background: "white",
  width: "100%",
  maxWidth: "900px",
  borderRadius: "18px",
  padding: "30px",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
};

const reservationHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  marginBottom: "24px"
};

const closeButton = {
  background: "transparent",
  border: "none",
  fontSize: "28px",
  cursor: "pointer"
};

const reservationForm = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px"
};

const fieldGroup = {
  display: "flex",
  flexDirection: "column"
};

const label = {
  fontWeight: "600",
  marginBottom: "8px",
  color: "#1f2937"
};

const input = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "15px"
};

const submitButton = {
  gridColumn: "1 / -1",
  background: "#2f5d4e",
  color: "white",
  border: "none",
  padding: "14px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  marginTop: "10px"
};

const successBox = {
  background: "#dcfce7",
  border: "1px solid #bbf7d0",
  padding: "20px",
  borderRadius: "12px"
};

export default Escalade;

