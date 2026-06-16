import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* HERO SECTION */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b')",
          height: "550px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: "20px"
        }}
      >
        <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>
          Explorez les Sommets
        </h1>

        <p style={{ fontSize: "20px", maxWidth: "700px" }}>
          Votre plateforme dédiée aux sports de montagne. Randonnée,
          escalade et ski — vivez l'aventure alpine.
        </p>

        <Link to="/activites">
          <button
            style={{
              padding: "12px 25px",
              marginTop: "25px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#2f5d4e",
              color: "white",
              cursor: "pointer"
            }}
          >
            Découvrir les activités
          </button>
        </Link>
      </div>

      {/* ACTIVITES POPULAIRES */}
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px" }}>Activités Populaires</h2>

        <p style={{ color: "#666", marginBottom: "40px" }}>
          Découvrez nos activités phares et trouvez celle qui vous correspond.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap"
          }}
        >

          {/* RANDONNEE */}
          <Link to="/randonnee" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={cardStyle}>
              <div style={{ position: "relative" }}>
                <img
                  src="https://magazine.sportihome.com/wp-content/uploads/2019/04/randonnee-alpes-scaled.jpg"
                  alt="Randonnée"
                  style={imageStyle}
                />
                <span style={badgeStyle}>Tous niveaux</span>
              </div>

              <div style={cardContent}>
                <h3>Randonnée</h3>
                <p style={textStyle}>
                  Parcourez les plus beaux sentiers alpins, des promenades familiales aux treks d'altitude.
                </p>
                <span style={linkStyle}>En savoir plus →</span>
              </div>
            </div>
          </Link>

          {/* ESCALADE */}
          <Link to="/escalade" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={cardStyle}>
              <div style={{ position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1522163182402-834f871fd851"
                  alt="Escalade"
                  style={imageStyle}
                />
                <span style={badgeStyle}>Intermédiaire</span>
              </div>

              <div style={cardContent}>
                <h3>Escalade</h3>
                <p style={textStyle}>
                  Grimpez les parois les plus spectaculaires des Alpes avec nos guides expérimentés.
                </p>
                <span style={linkStyle}>En savoir plus →</span>
              </div>
            </div>
          </Link>

          {/* SKI */}
          <Link to="/ski" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={cardStyle}>
              <div style={{ position: "relative" }}>
                <img
                  src="https://azimut.ski/public/uploads/ski-randonnee_groenland_bateau_giacomo-meneghello_2015(26).jpg/main.jpg"
                  alt="Ski"
                  style={imageStyle}
                />
                <span style={badgeStyle}>Tous niveaux</span>
              </div>

              <div style={cardContent}>
                <h3>Ski</h3>
                <p style={textStyle}>
                  Dévalez les pistes enneigées des plus belles stations alpines toute la saison.
                </p>
                <span style={linkStyle}>En savoir plus →</span>
              </div>
            </div>
          </Link>

        </div>

        <div style={{ marginTop: "40px" }}>
          <Link to="/activites">
            <button style={buttonStyle}>
              Voir toutes les activités →
            </button>
          </Link>
        </div>
      </div>

      {/* SECTION INFORMATIONS */}
      <div style={infoSection}>

        <div style={infoBlock}>
          <div style={iconCircle}>🗺️</div>
          <h3>Itinéraires sélectionnés</h3>
          <p style={infoText}>
            Des parcours soigneusement choisis pour tous les niveaux d'expérience.
          </p>
        </div>

        <div style={infoBlock}>
          <div style={iconCircle}>👥</div>
          <h3>Communauté engagée</h3>
          <p style={infoText}>
            Rejoignez des passionnés et partagez vos aventures en montagne.
          </p>
        </div>

        <div style={infoBlock}>
          <div style={iconCircle}>📖</div>
          <h3>Articles d'experts</h3>
          <p style={infoText}>
            Conseils, astuces et récits rédigés par des professionnels de la montagne.
          </p>
        </div>

      </div>

    </div>
  );
}

const cardStyle = {
  width: "320px",
  background: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover"
};

const badgeStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  background: "#f4a742",
  color: "white",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px"
};

const cardContent = {
  padding: "20px",
  textAlign: "left"
};

const textStyle = {
  color: "#666"
};

const linkStyle = {
  color: "#2f5d4e",
  fontWeight: "bold"
};

const buttonStyle = {
  background: "#2f5d4e",
  color: "white",
  padding: "14px 30px",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer"
};

const infoSection = {
  background: "#f5f5f3",
  padding: "80px 20px",
  display: "flex",
  justifyContent: "center",
  gap: "80px",
  textAlign: "center",
  flexWrap: "wrap"
};

const infoBlock = {
  maxWidth: "300px"
};

const iconCircle = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "#e4e6e1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 20px",
  fontSize: "28px"
};

const infoText = {
  color: "#666"
};

export default Home;