import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function Contact() {

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const text = await response.text();
    console.log("Réponse serveur :", text);

    alert("Message envoyé !");
    
  } catch (error) {
    console.error("Erreur fetch :", error);
    alert("Erreur lors de l'envoi");
  }
};



  return (
    <div style={{ padding: "60px 20px", maxWidth: "1200px", margin: "auto" }}>

      {/* TITRE */}
      <h1 style={{ textAlign: "center", fontSize: "48px" }}>
        Contact
      </h1>

      <p style={{ textAlign: "center", color: "#666", marginBottom: "60px" }}>
        Une question ? Besoin d'informations ? N'hésitez pas à nous contacter.
      </p>


      {/* SECTION CONTACT */}
      <div
        style={{
          display: "flex",
          gap: "60px",
          flexWrap: "wrap"
        }}
      >

        {/* COORDONNEES */}
        <div style={{ flex: 1 }}>

          <h2>Nos coordonnées</h2>

          <div style={{ marginTop: "40px" }}>

            <div style={infoBlock}>
              <div style={iconCircle}>📍</div>
              <div>
                <strong>Adresse</strong>
                <p style={infoText}>
                  35 Place de l'Aiguille du Midi<br/>
                  74400 Chamonix-Mont-Blanc, France
                </p>
              </div>
            </div>

            <div style={infoBlock}>
              <div style={iconCircle}>✉</div>
              <div>
                <strong>Email</strong>
                <p style={infoText}>
                  contact@aventures-alpines.fr
                </p>
              </div>
            </div>

            <div style={infoBlock}>
              <div style={iconCircle}>📞</div>
              <div>
                <strong>Téléphone</strong>
                <p style={infoText}>
                  +33 4 50 00 00 00
                </p>
              </div>
            </div>

          </div>

        </div>


        {/* FORMULAIRE */}
        <div style={formBox}>

          <form onSubmit={handleSubmit}>

            <div style={{ display: "flex", gap: "20px" }}>

              <div style={{ flex: 1 }}>
                <label>Nom</label>

                <input
                  type="text"
                  name="nom"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="votre@email.fr"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

            </div>


            <div style={{ marginTop: "20px" }}>
              <label>Sujet</label>

              <input
                type="text"
                name="sujet"
                placeholder="Sujet de votre message"
                value={formData.sujet}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>


            <div style={{ marginTop: "20px" }}>
              <label>Message</label>

              <textarea
                name="message"
                placeholder="Votre message..."
                value={formData.message}
                onChange={handleChange}
                rows="5"
                style={inputStyle}
              />
            </div>

            <button style={buttonStyle}>
              ✈ Envoyer le message
            </button>

          </form>

        </div>

      </div>


      {/* CARTE */}
      <div style={{ marginTop: "80px", textAlign: "center" }}>

        <h2>Où nous trouver</h2>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Notre bureau est situé au cœur de Chamonix-Mont-Blanc,
          au pied du massif du Mont-Blanc. Venez nous rendre visite !
        </p>

        <div style={mapContainer}>

          <MapContainer
            center={[45.9237, 6.8694]}
            zoom={13}
            style={{ height: "350px", width: "100%" }}
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[45.9237, 6.8694]} icon={customIcon}>
              <Popup>Aventures Alpines</Popup>
            </Marker>

          </MapContainer>

        </div>

      </div>


      {/* RESEAUX SOCIAUX */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>

        <p style={{ marginBottom: "20px" }}>Suivez-nous</p>

        <div style={socialContainer}>

          <a
            href="https://www.facebook.com/login"
            target="_blank"
            rel="noreferrer"
            style={socialIcon}
            onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.15)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
          >
            f
          </a>

          <a
            href="https://www.instagram.com/accounts/login/"
            target="_blank"
            rel="noreferrer"
            style={socialIcon}
            onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.15)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
          >
            📷
          </a>

          <a
            href="https://twitter.com/login"
            target="_blank"
            rel="noreferrer"
            style={socialIcon}
            onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.15)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
          >
            X
          </a>

          <a
            href="https://www.youtube.com/account"
            target="_blank"
            rel="noreferrer"
            style={socialIcon}
            onMouseEnter={(e)=>e.currentTarget.style.transform="scale(1.15)"}
            onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
          >
            ▶
          </a>

        </div>

      </div>

    </div>
  );
}


/* STYLES */

const formBox = {
  flex: 2,
  background: "#f8f8f8",
  padding: "40px",
  borderRadius: "10px"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  marginTop: "5px"
};

const buttonStyle = {
  marginTop: "25px",
  background: "#2f5d4e",
  color: "white",
  padding: "12px 25px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const infoBlock = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginBottom: "25px"
};

const iconCircle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const infoText = {
  margin: 0,
  color: "#666"
};

const mapContainer = {
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
};

const socialContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "15px"
};

const socialIcon = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  color: "#333",
  fontWeight: "bold",
  transition: "all 0.2s ease"
};

export default Contact;