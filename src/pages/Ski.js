import { useMemo, useState, useEffect } from "react";

function Ski() {
  const [activeTab, setActiveTab] = useState("disciplines");
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [reservationEnvoyee, setReservationEnvoyee] = useState(false);
  const [regionFiltre, setRegionFiltre] = useState("Toutes les régions");
  const [typeFiltre, setTypeFiltre] = useState("Tous types");
  const [stations, setStations] = useState([]);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    date: "",
    personnes: 1
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/stations-ski")
      .then(res => res.json())
      .then(data => setStations(Array.isArray(data) ? data : []))
      .catch(err => console.log(err));
  }, []);

  const disciplines = [
    {
      name: "Ski alpin",
      desc: "Dévalez les pistes balisées de toutes difficultés dans les plus grandes stations.",
      icon: "⛰"
    },
    {
      name: "Ski de fond",
      desc: "Parcourez les pistes nordiques au cœur de paysages enneigés grandioses.",
      icon: "🎿"
    },
    {
      name: "Ski hors-piste",
      desc: "Pour les skieurs confirmés : freeride et poudreuse vierge avec guide obligatoire.",
      icon: "❄"
    }
  ];

  const offres = [
    {
      id: 1,
      titre: "Séjour Freestyle Snowpark",
      station: "Avoriaz",
      description: "Accès snowpark + forfait 2 jours + coaching freestyle pour améliorer vos sauts et vos tricks en toute sécurité.",
      prix: "149.00€",
      type: "expérience",
      valable: "10 janv. - 28 fév.",
      remise: "-20%",
      image: "https://media-server.clubmed.com/image/jpeg/2000/auto/crop/center/60/https:%2F%2Fns.clubmed.com%2FFEAM%2FMarketing%2FOmnichannel%2FSEO%2FLocalisationInconnue%2FMontagne%2FGettyImages-178160231.jpg"
    },
    {
      id: 2,
      titre: "Week-end Ski Famille Premium",
      station: "Les Gets",
      description: "Forfait famille 2 jours avec location de matériel et accès aux pistes débutants et intermédiaires.",
      prix: "179.00€",
      type: "famille",
      valable: "5 janv. - 20 mars",
      remise: "-15%",
      image: "https://woody.cloudly.space/app/uploads/crt-paca/2021/01/thumbs/famille-montagne-premierfois-ski-rogiervanrijn-1920x960.jpg"
    },
    {
      id: 3,
      titre: "Journée Hors-Piste Encadrée",
      station: "Tignes",
      description: "Sortie hors-piste avec guide diplômé, briefing sécurité avalanche et découverte des meilleurs itinéraires freeride.",
      prix: "210.00€",
      type: "aventure",
      valable: "15 déc. - 30 mars",
      remise: "-25%",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256"
    }
  ];

  const stationsFiltrees = useMemo(() => {
    return stations.filter((station) => {
      const okRegion = regionFiltre === "Toutes les régions" || station.region === regionFiltre;
      const okType = typeFiltre === "Tous types" || station.type === typeFiltre;
      return okRegion && okType;
    });
  }, [stations, regionFiltre, typeFiltre]);

  const stats = useMemo(() => {
    const totalStations = stationsFiltrees.length;
    const totalKm = stationsFiltrees.reduce((sum, s) => sum + (s.km_pistes || 0), 0);
    const totalRemontees = stationsFiltrees.reduce((sum, s) => sum + (s.remontees || 0), 0);
    const moyenneNeige =
      totalStations > 0
        ? Math.round(stationsFiltrees.reduce((sum, s) => sum + (parseInt(s.conditions_enneigement) || 0), 0) / totalStations)
        : 0;
    return { totalStations, totalKm, totalRemontees, moyenneNeige };
  }, [stationsFiltrees]);

  function ouvrirReservation(offre) {
    setSelectedOffre(offre);
    setReservationEnvoyee(false);
    setFormData({ nom: "", email: "", date: "", personnes: 1 });
  }

  function fermerReservation() {
    setSelectedOffre(null);
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

    const prixNumber = parseFloat(selectedOffre.prix.replace("€", "").replace(",", ".").trim());

    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          utilisateur_id: user.id,
          activite_nom: selectedOffre.titre,
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
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://i.pinimg.com/originals/97/2b/d1/972bd1eec825fdd2d907d5e5179384c0.jpg')",
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
        <h1 style={{ fontSize: "70px" }}>Ski</h1>
        <p style={{ fontSize: "22px" }}>Les meilleures stations alpines pour toutes les glisses.</p>
      </div>

      <div style={tabsWrapper}>
        <button onClick={() => setActiveTab("disciplines")} style={activeTab === "disciplines" ? activeTabStyle : tabStyle}>DISCIPLINES</button>
        <button onClick={() => setActiveTab("stations")} style={activeTab === "stations" ? activeTabStyle : tabStyle}>STATIONS</button>
        <button onClick={() => setActiveTab("temoignages")} style={activeTab === "temoignages" ? activeTabStyle : tabStyle}>TÉMOIGNAGES</button>
        <button onClick={() => setActiveTab("offres")} style={activeTab === "offres" ? activeTabStyle : tabStyle}>OFFRES</button>
      </div>

      {activeTab === "disciplines" && (
        <section style={{ maxWidth: "1100px", margin: "80px auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "36px", marginBottom: "40px" }}>Disciplines</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "30px" }}>
            {disciplines.map((d, i) => (
              <div key={i} style={{ background: "#f9fafb", padding: "30px", borderRadius: "12px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <div style={{ fontSize: "35px", marginBottom: "10px" }}>{d.icon}</div>
                <h3 style={{ marginBottom: "10px" }}>{d.name}</h3>
                <p style={{ color: "#6b7280" }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "stations" && (
        <section style={{ maxWidth: "1200px", margin: "80px auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "42px", marginBottom: "10px" }}>Stations de Ski Partenaires</h2>
          <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "30px" }}>Consultez les conditions d'enneigement en temps réel et découvrez nos stations partenaires.</p>
          <div style={separator} />
          <div style={filtersBox}>
            <div style={filterGroup}>
              <label style={filterLabel}>RÉGION :</label>
              <select value={regionFiltre} onChange={(e) => setRegionFiltre(e.target.value)} style={selectStyle}>
                <option>Toutes les régions</option>
                <option>Haute-Savoie</option>
                <option>Savoie</option>
              </select>
            </div>
            <div style={filterGroup}>
              <label style={filterLabel}>TYPE :</label>
              <select value={typeFiltre} onChange={(e) => setTypeFiltre(e.target.value)} style={selectStyle}>
                <option>Tous types</option>
                <option>Snowpark</option>
                <option>Famille</option>
                <option>Freeride</option>
                <option>Premium</option>
              </select>
            </div>
          </div>

          <div style={statsGrid}>
            <div style={statCard}><div style={statNumber}>{stats.totalStations}</div><div style={statLabel}>STATIONS</div></div>
            <div style={statCard}><div style={statNumber}>{stats.totalKm}</div><div style={statLabel}>KM DE PISTES</div></div>
            <div style={statCard}><div style={statNumber}>{stats.totalRemontees}</div><div style={statLabel}>REMONTÉES</div></div>
            <div style={statCard}><div style={statNumber}>{stats.moyenneNeige}</div><div style={statLabel}>CM DE NEIGE (MOY)</div></div>
          </div>

          <div style={stationsGrid}>
            {stationsFiltrees.map((station) => (
              <div key={station.id} style={stationCard}>
                <div style={{ position: "relative" }}>
                  <img src={station.image_url} alt={station.nom} style={stationImage} />
                  <div style={snowBadge}>{station.conditions_enneigement}</div>
                </div>
                <div style={stationContent}>
                  <div style={stationHeader}>
                    <h3 style={{ fontSize: "20px", margin: 0 }}>{station.nom}</h3>
                    <span style={stationTypeBadge}>{station.type ? station.type.toUpperCase() : ""}</span>
                  </div>
                  <p style={stationDescription}>{station.description}</p>
                  <div style={stationInfos}>
                    <div style={stationLine}><span style={stationLabelStyle}>Domaine :</span><span>{station.domaine}</span></div>
                    <div style={stationLine}><span style={stationLabelStyle}>Région :</span><span>{station.region}</span></div>
                    <div style={stationLine}><span style={stationLabelStyle}>Altitude :</span><span>{station.altitude}</span></div>
                    <div style={stationLine}><span style={stationLabelStyle}>Pistes :</span><span>{station.km_pistes} km</span></div>
                    <div style={stationLine}><span style={stationLabelStyle}>Remontées :</span><span>{station.remontees}</span></div>
                    <div style={stationLine}><span style={stationLabelStyle}>Type de ski :</span><span>{station.type_ski || "Non renseigné"}</span></div>
                    <div style={stationLine}><span style={stationLabelStyle}>Remontées mécaniques :</span><span>{station.remontees_mecaniques ? "Oui" : "Non"}</span></div>
                    <div style={stationLine}><span style={stationLabelStyle}>Type de piste :</span><span>{station.type_piste || "Non renseigné"}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "temoignages" && (
        <TemoignagesSection />
      )}

      {activeTab === "offres" && (
        <section style={{ maxWidth: "1200px", margin: "80px auto" }}>
          <h2 style={{ fontSize: "40px", marginBottom: "10px" }}>Offres spéciales</h2>
          <p style={{ color: "#6b7280", marginBottom: "35px", maxWidth: "850px" }}>
            Découvrez nos meilleures offres pour profiter pleinement de la saison de ski : matériel, cours privés et packs complets.
          </p>
          <div style={offersGrid}>
            {offres.map((offre) => (
              <div key={offre.id} style={offerCard}>
                <div style={{ position: "relative" }}>
                  <img src={offre.image} alt={offre.titre} style={offerImage} />
                  <div style={discountBadge}>{offre.remise}</div>
                </div>
                <div style={offerContent}>
                  <div style={titleTopRow}>
                    <h3 style={{ fontSize: "20px", marginBottom: "12px", maxWidth: "220px" }}>{offre.titre}</h3>
                    <span style={stationBadge}>{offre.station}</span>
                  </div>
                  <p style={offerDescription}>{offre.description}</p>
                  <div style={offerInfoBlock}>
                    <div style={infoLine}><span style={infoLabel}>PRIX :</span><span>{offre.prix}</span></div>
                    <div style={infoLine}><span style={infoLabel}>TYPE :</span><span>{offre.type}</span></div>
                    <div style={infoLine}><span style={infoLabel}>VALABLE :</span><span>{offre.valable}</span></div>
                  </div>
                  <button style={offerButton} onClick={() => ouvrirReservation(offre)}>RÉSERVER MAINTENANT</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedOffre && (
        <div style={overlay}>
          <div style={modal}>
            <div style={reservationHeader}>
              <div>
                <h3 style={{ marginBottom: "6px", fontSize: "34px" }}>Réserver : {selectedOffre.titre}</h3>
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
                  <input type="number" name="personnes" min="1" max="8" value={formData.personnes} onChange={handleChange} required style={input} />
                </div>
                <button type="submit" style={submitButton}>Confirmer la réservation</button>
              </form>
            ) : (
              <div style={successBox}>
                <h4 style={{ fontSize: "24px", marginBottom: "10px" }}>Réservation confirmée ✅</h4>
                <p style={{ color: "#166534", lineHeight: "1.6" }}>
                  Merci {formData.nom}, votre demande pour <strong>{selectedOffre.titre}</strong> a bien été enregistrée pour le <strong>{formData.date}</strong>.
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

/* =========================
   TEMOIGNAGES SECTION
========================= */

function TemoignagesSection() {
  const [temoignages, setTemoignages] = useState([]);
  const [envoye, setEnvoye] = useState(false);
  const [form, setForm] = useState({ nom: "", email: "", type_ski: "", note: 5, message: "" });

  useEffect(() => {
    fetchTemoignages();
  }, []);

  async function fetchTemoignages() {
    const res = await fetch("http://localhost:5000/api/temoignages-ski");
    const data = await res.json();
    setTemoignages(Array.isArray(data) ? data : []);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/temoignages-ski", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.error) {
      alert("Erreur : " + data.error);
    } else {
      setEnvoye(true);
      fetchTemoignages();
      setForm({ nom: "", email: "", type_ski: "", note: 5, message: "" });
      setTimeout(() => setEnvoye(false), 4000);
    }
  }

  return (
    <section style={{ maxWidth: "1200px", margin: "80px auto", padding: "0 20px" }}>
      <h2 style={{ textAlign: "center", fontSize: "40px", marginBottom: "10px" }}>
        Témoignages de Skieurs Passionnés
      </h2>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "50px" }}>
        Partagez votre expérience ou lisez celles de notre communauté
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>

        {/* FORMULAIRE */}
        <div style={{ background: "white", border: "1px solid #e5e7eb", padding: "35px", borderRadius: "12px" }}>
          <h3 style={{ marginBottom: "25px", fontSize: "20px" }}>Partagez votre expérience</h3>

          {envoye && (
            <div style={{ background: "#dcfce7", border: "1px solid #bbf7d0", padding: "14px", borderRadius: "8px", marginBottom: "20px", color: "#166534" }}>
              ✅ Témoignage envoyé, merci !
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={temoLabel}>NOM *</label>
                <input name="nom" value={form.nom} onChange={handleChange} required style={temoInput} />
              </div>
              <div>
                <label style={temoLabel}>EMAIL</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} style={temoInput} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={temoLabel}>TYPE DE SKI</label>
                <select name="type_ski" value={form.type_ski} onChange={handleChange} style={temoInput}>
                  <option value="">Choisir...</option>
                  <option value="Alpin">Alpin</option>
                  <option value="Fond">Fond</option>
                  <option value="Hors-piste">Hors-piste</option>
                </select>
              </div>
              <div>
                <label style={temoLabel}>NOTE (1-5)</label>
                <select name="note" value={form.note} onChange={handleChange} style={temoInput}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} {"★".repeat(n)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={temoLabel}>MESSAGE *</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} required
                placeholder="Racontez-nous votre expérience..."
                style={{ ...temoInput, height: "120px", resize: "vertical" }}
              />
            </div>

            <button type="submit" style={{
              width: "100%", padding: "14px", background: "white",
              border: "1px solid black", cursor: "pointer", fontWeight: "500",
              letterSpacing: "1px", fontSize: "14px"
            }}>
              ENVOYER MON TÉMOIGNAGE
            </button>
          </form>
        </div>

        {/* LISTE TEMOIGNAGES */}
        <div>
          <h3 style={{ marginBottom: "20px", fontSize: "20px" }}>Derniers témoignages</h3>
          {temoignages.length === 0 ? (
            <p style={{ color: "#6b7280" }}>Aucun témoignage pour le moment.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxHeight: "600px", overflowY: "auto" }}>
              {temoignages.map(t => (
                <div key={t.id} style={{ background: "white", border: "1px solid #e5e7eb", padding: "20px", borderRadius: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <strong>{t.nom}</strong>
                      {t.type_ski && (
                        <span style={{ background: "#f3f4f6", padding: "4px 10px", borderRadius: "999px", fontSize: "12px", color: "#374151" }}>
                          {t.type_ski}
                        </span>
                      )}
                    </div>
                    <span style={{ color: "#f59e0b" }}>{"★".repeat(t.note)}</span>
                  </div>
                  <p style={{ color: "#6b7280", fontStyle: "italic", marginBottom: "8px" }}>"{t.message}"</p>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>
                    {new Date(t.date_temoignage).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================
   STYLES
========================= */

const temoLabel = {
  display: "block", fontWeight: "600", marginBottom: "6px",
  fontSize: "12px", letterSpacing: "1px", color: "#374151"
};

const temoInput = {
  width: "100%", padding: "10px 12px", border: "1px solid #d1d5db",
  fontSize: "14px", color: "#374151", background: "white", boxSizing: "border-box"
};

const tabsWrapper = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  borderBottom: "1px solid #d1d5db",
  maxWidth: "1300px",
  margin: "0 auto"
};

const tabStyle = {
  background: "white", border: "none", borderBottom: "3px solid transparent",
  padding: "28px 15px", fontSize: "22px", letterSpacing: "1px",
  color: "#6b7280", cursor: "pointer", fontWeight: "400"
};

const activeTabStyle = {
  background: "white", border: "none", borderBottom: "3px solid black",
  padding: "28px 15px", fontSize: "22px", letterSpacing: "1px",
  color: "black", cursor: "pointer", fontWeight: "400"
};

const separator = { width: "70px", height: "2px", background: "#9ca3af", margin: "0 auto 50px auto" };

const filtersBox = {
  display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px",
  border: "1px solid #e5e7eb", padding: "24px", marginBottom: "40px"
};

const filterGroup = { display: "flex", flexDirection: "column" };

const filterLabel = { fontWeight: "600", marginBottom: "10px", color: "#374151", letterSpacing: "1px" };

const selectStyle = { padding: "14px", border: "1px solid #d1d5db", fontSize: "15px", color: "#374151", background: "white" };

const statsGrid = { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" };

const statCard = { border: "1px solid #e5e7eb", padding: "32px 20px", textAlign: "center", background: "white" };

const statNumber = { fontSize: "52px", fontWeight: "300", marginBottom: "10px", color: "#111827" };

const statLabel = { color: "#9ca3af", letterSpacing: "1px", fontWeight: "600" };

const stationsGrid = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" };

const stationCard = { border: "1px solid #e5e7eb", background: "white" };

const stationImage = { width: "100%", height: "220px", objectFit: "cover" };

const stationContent = { padding: "24px" };

const stationHeader = { display: "flex", justifyContent: "space-between", gap: "15px", alignItems: "flex-start", marginBottom: "16px" };

const stationTypeBadge = { border: "1px solid #9ca3af", padding: "8px 12px", fontSize: "12px", letterSpacing: "1px", color: "#6b7280", whiteSpace: "nowrap" };

const snowBadge = { position: "absolute", bottom: "16px", right: "16px", background: "rgba(255,255,255,0.9)", color: "#374151", padding: "10px 14px", fontWeight: "600" };

const stationDescription = { color: "#4b5563", lineHeight: "1.7", marginBottom: "18px", minHeight: "80px" };

const stationInfos = { borderTop: "1px solid #e5e7eb", paddingTop: "16px" };

const stationLine = { display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#374151" };

const stationLabelStyle = { fontWeight: "500" };

const offersGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" };

const offerCard = { border: "1px solid #e5e7eb", background: "white" };

const offerImage = { width: "100%", height: "220px", objectFit: "cover" };

const offerContent = { padding: "30px" };

const titleTopRow = { display: "flex", justifyContent: "space-between", gap: "15px", alignItems: "flex-start", marginBottom: "10px" };

const stationBadge = { border: "1px solid #9ca3af", padding: "10px 14px", fontSize: "14px", letterSpacing: "1px", whiteSpace: "nowrap", color: "#6b7280" };

const offerDescription = { color: "#4b5563", lineHeight: "1.8", marginBottom: "18px", minHeight: "95px" };

const offerInfoBlock = { borderTop: "1px solid #e5e7eb", borderBottom: "1px solid #e5e7eb", padding: "14px 0", marginBottom: "24px" };

const infoLine = { display: "flex", justifyContent: "space-between", marginBottom: "14px", color: "#374151" };

const infoLabel = { fontWeight: "500", letterSpacing: "1px" };

const offerButton = { background: "white", border: "1px solid black", padding: "14px 22px", cursor: "pointer", fontWeight: "500", letterSpacing: "1px" };

const discountBadge = { position: "absolute", top: "18px", right: "18px", background: "black", color: "white", padding: "16px 18px", fontWeight: "600", fontSize: "18px" };

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

export default Ski;