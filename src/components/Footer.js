import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "#1e2b32",
        color: "white",
        padding: "60px 40px 20px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px"
        }}
      >
        {/* LOGO + TEXTE */}
        <div style={{ maxWidth: "300px" }}>
          <h2 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#f4a742" }}>⛰</span>
            Aventures Alpines
          </h2>

          <p style={{ color: "#c5c5c5" }}>
            Votre plateforme dédiée aux sports de montagne. Randonnée,
            escalade, ski — explorez les sommets avec nous.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3>Navigation</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link style={footerLink} to="/">Accueil</Link>
            <Link style={footerLink} to="/activites">Activités</Link>
            <Link style={footerLink} to="/randonnee">Randonnée</Link>
            <Link style={footerLink} to="/escalade">Escalade</Link>
            <Link style={footerLink} to="/ski">Ski</Link>
            <Link style={footerLink} to="/articles">Blog</Link>
            <Link style={footerLink} to="/contact">Contact</Link>
            <Link style={footerLink} to="/connexion">Connexion</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3>Contact</h3>

          <p>contact@aventures-alpines.fr</p>
          <p>+33 4 50 00 00 00</p>
          <p>Chamonix-Mont-Blanc, France</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        style={{
          borderTop: "1px solid #3a4a52",
          marginTop: "40px",
          paddingTop: "20px",
          textAlign: "center",
          color: "#c5c5c5"
        }}
      >
        © 2026 Aventures Alpines. Tous droits réservés.
      </div>
    </footer>
  );
}

const footerLink = {
  color: "#c5c5c5",
  textDecoration: "none"
};

export default Footer;