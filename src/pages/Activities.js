import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Activities() {
  const imagesRandonnee = [
    "https://www.ovonetwork.com/blog/wp-content/uploads/2021/05/Lac-Blanc-OT_Chamonix-Mont-Blanc_CM-2-1536x1023.jpg",
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b",
    "https://i.notretemps.com/1400x787/smart/2024/06/27/randonnee-alpes.jpeg"
  ];

  const imagesEscalade = [
    "https://escapades-d-ecotourisme.fr/wp-content/uploads/2024/07/what-are-the-best-ice-climbing-spots-in-the-swiss-alps-tips-and-seasons.jpeg",
    "https://www.sportokay.com/media/catalog/category/brands/media/okay_mount1.jpg",
    "https://outdoortroop.com/wp-content/uploads/2019/01/46731917_l-1024x683.jpg"
  ];

  const imagesSki = [
    "https://a.cdn-hotels.com/gdcs/production170/d136/d97c8af5-b49a-4aaf-bcd3-eb8416cef161.jpg",
    "https://static.wixstatic.com/media/21be9c_f3845f2f1e6c414880569bf5035ff612~mv2.jpg",
    "https://edqa7zdivd7.exactdn.com/wp-content/uploads/2024/01/La-Clusaz.jpg"
  ];

  const [activites, setActivites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/activites")
      .then((res) => res.json())
      .then((data) => {
        setActivites(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Erreur récupération activités :", err);
        setLoading(false);
      });
  }, []);

  const randonnees = activites
    .filter((item) => item.categorie === "randonnee")
    .map((item) => ({
      title: item.nom,
      badge: item.niveau_difficulte,
      description: item.description,
      images: imagesRandonnee,
      path: "/randonnee"
    }));

  const escalades = activites
    .filter((item) => item.categorie === "escalade")
    .map((item) => ({
      title: item.nom,
      badge: item.niveau_difficulte,
      description: item.description,
      images: imagesEscalade,
      path: "/escalade"
    }));

  const ski = activites
    .filter((item) => item.categorie === "ski")
    .map((item) => ({
      title: item.nom,
      badge: item.niveau_difficulte,
      description: item.description,
      images: imagesSki,
      path: "/ski"
    }));

  return (
    <div>
      <div style={hero}>
        <h1 style={heroTitle}>Nos Activités</h1>
        <p style={heroText}>
          Explorez une variété de sports de montagne et trouvez votre prochaine aventure.
        </p>
      </div>

      <div style={introSection}>
        <h2 style={introTitle}>Choisissez votre prochaine expérience</h2>
        <p style={introText}>
          Découvrez nos univers dédiés à la randonnée, à l’escalade et au ski à travers
          des expériences pensées pour tous les profils, du curieux débutant au passionné.
        </p>
      </div>

      {loading ? (
        <p style={loadingText}>Chargement des activités...</p>
      ) : (
        <>
          <Section
            title="Séjours Randonnée"
            subtitle="Des expériences au grand air entre découverte, immersion et aventure alpine."
            activities={randonnees}
          />

          <Section
            title="Expériences Escalade"
            subtitle="Des sorties verticales pour s’initier, progresser et vivre la montagne autrement."
            activities={escalades}
          />

          <Section
            title="Séjours au Ski"
            subtitle="Des offres pensées pour profiter pleinement de la saison d’hiver, en famille ou dans une optique plus sportive."
            activities={ski}
          />
        </>
      )}
    </div>
  );
}

function Section({ title, subtitle, activities }) {
  if (activities.length === 0) return null;

  return (
    <section style={sectionWrapper}>
      <div style={sectionHeader}>
        <h2 style={sectionTitle}>{title}</h2>
        <p style={sectionSubtitle}>{subtitle}</p>
      </div>

      <div style={cardsContainer}>
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            title={activity.title}
            badge={activity.badge}
            description={activity.description}
            images={activity.images}
            path={activity.path}
          />
        ))}
      </div>
    </section>
  );
}

function ActivityCard({ title, badge, description, images, path }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div style={card}>
      <div style={{ position: "relative" }}>
        <img src={images[index]} alt={title} style={image} />

        <button onClick={prev} style={arrowLeft}>
          ‹
        </button>

        <button onClick={next} style={arrowRight}>
          ›
        </button>
      </div>

      <div style={cardContent}>
        <div style={titleRow}>
          <h3 style={cardTitle}>{title}</h3>
          <span style={badgeStyle}>{badge}</span>
        </div>

        <p style={descriptionStyle}>{description}</p>

        <Link to={path}>
          <button style={button}>En savoir plus →</button>
        </Link>
      </div>
    </div>
  );
}

export default Activities;

/* HERO */

const hero = {
  height: "300px",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center"
};

const heroTitle = {
  fontSize: "60px"
};

const heroText = {
  fontSize: "18px"
};

/* INTRO */

const introSection = {
  maxWidth: "900px",
  margin: "60px auto 20px auto",
  textAlign: "center",
  padding: "0 20px"
};

const introTitle = {
  fontSize: "34px",
  marginBottom: "15px"
};

const introText = {
  color: "#6b7280",
  lineHeight: "1.7",
  fontSize: "16px"
};

const loadingText = {
  textAlign: "center",
  marginTop: "40px",
  color: "#6b7280",
  fontSize: "18px"
};

/* SECTIONS */

const sectionWrapper = {
  maxWidth: "1300px",
  margin: "40px auto 20px auto",
  padding: "0 40px"
};

const sectionHeader = {
  marginBottom: "30px"
};

const sectionTitle = {
  fontSize: "36px",
  marginBottom: "10px"
};

const sectionSubtitle = {
  color: "#6b7280",
  lineHeight: "1.6",
  maxWidth: "800px"
};

/* CARDS */

const cardsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "30px"
};

const card = {
  background: "white",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column"
};

const image = {
  width: "100%",
  height: "220px",
  objectFit: "cover"
};

/* ARROWS */

const arrowLeft = {
  position: "absolute",
  top: "50%",
  left: "10px",
  transform: "translateY(-50%)",
  background: "rgba(0,0,0,0.5)",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  cursor: "pointer",
  fontSize: "18px"
};

const arrowRight = {
  ...arrowLeft,
  left: "auto",
  right: "10px"
};

/* CARD CONTENT */

const cardContent = {
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  flex: "1"
};

const titleRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "10px"
};

const cardTitle = {
  margin: 0,
  fontSize: "22px",
  lineHeight: "1.3"
};

const badgeStyle = {
  background: "#e59d3c",
  color: "white",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "13px",
  whiteSpace: "nowrap"
};

const descriptionStyle = {
  margin: "15px 0",
  color: "#666",
  lineHeight: "1.6",
  flex: "1"
};

/* BUTTON */

const button = {
  background: "#2f5d4e",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "auto"
};