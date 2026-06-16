const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/* TEST SERVEUR */

app.get("/", (req, res) => {
  res.send("Serveur Aventures Alpines OK");
});


/* =========================
   ACTIVITES
========================= */

app.get("/api/activites", (req, res) => {
  const sql = "SELECT * FROM activite";
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Erreur SQL (GET activite) :", err);
      return res.status(500).json({ error: "Erreur récupération activités" });
    }
    res.json(results);
  });
});

app.post("/api/activites", (req, res) => {
  const { nom, description, niveau_difficulte, saison_recommandee, image_url, categorie } = req.body;

  if (!nom || nom.trim() === "") {
    return res.status(400).json({ error: "Nom activité obligatoire" });
  }

  const sql = `
  INSERT INTO activite
  (nom, description, niveau_difficulte, saison_recommandee, image_url, categorie)
  VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [nom, description, niveau_difficulte, saison_recommandee, image_url, categorie], (err, result) => {
    if (err) {
      console.log("Erreur SQL (POST activite) :", err);
      return res.status(500).json({ error: "Erreur ajout activité" });
    }
    res.status(201).json({ message: "Activité ajoutée", id: result.insertId });
  });
});


/* =========================
   RANDONNEES
========================= */

app.get("/api/offres-randonne", (req, res) => {

  const sql = "SELECT * FROM offres_randonne";

  db.query(sql, (err, results) => {

    if (err) {
      console.log("Erreur SQL (GET offres_randonne) :", err);
      return res.status(500).json({ error: "Erreur récupération randonnées" });
    }

    res.json(results);

  });

});


/* =========================
   GUIDES
========================= */

app.get("/api/guides", (req, res) => {
  db.query("SELECT * FROM guide", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur récupération guides" });
    res.json(results);
  });
});


/* =========================
   ITINERAIRES
========================= */

app.get("/api/itineraires", (req, res) => {
  const sql = "SELECT * FROM itineraires";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur récupération itinéraires" });
    res.json(results);
  });
});


/* =========================
   ESCALADE
========================= */

app.get("/api/offres-escalade", (req, res) => {

  const sql = "SELECT * FROM offres_escalade";

  db.query(sql, (err, results) => {

    if (err) {
      console.log("Erreur SQL (GET offres_escalade) :", err);
      return res.status(500).json({ error: "Erreur récupération offres escalade" });
    }

    res.json(results);

  });

});


/* =========================
   SITES ESCALADE
========================= */

app.get("/api/sites-escalade", (req, res) => {
  const sql = "SELECT * FROM sites_escalade";

  db.query(sql, (err, results) => {
    if (err) {
      console.log("Erreur SQL (GET sites_escalade) :", err);
      return res.status(500).json({ error: "Erreur récupération sites escalade" });
    }

    res.json(results);
  });
});


/* =========================
   STATIONS SKI
========================= */

app.get("/api/stations-ski", (req, res) => {

  const sql = "SELECT * FROM stations_ski";

  db.query(sql, (err, results) => {

    if (err) {
      console.log("Erreur SQL (GET stations_ski) :", err);
      return res.status(500).json({ error: "Erreur récupération stations ski" });
    }

    res.json(results);

  });

});

/* =========================
   TEMOIGNAGES SKI
========================= */

// Récupérer tous les témoignages
app.get("/api/temoignages-ski", (req, res) => {
  const sql = "SELECT * FROM temoignages_ski ORDER BY date_temoignage DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur récupération témoignages" });
    res.json(results);
  });
});

// Ajouter un témoignage
app.post("/api/temoignages-ski", (req, res) => {
  const { nom, email, type_ski, note, message } = req.body;
  const sql = `INSERT INTO temoignages_ski (nom, email, type_ski, note, message) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [nom, email, type_ski, note, message], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur ajout témoignage" });
    res.status(201).json({ message: "Témoignage ajouté", id: result.insertId });
  });
});


/* =========================
   OFFRES SKI
========================= */

app.get("/api/offres-ski", (req, res) => {

  const sql = "SELECT * FROM offres_ski";

  db.query(sql, (err, results) => {

    if (err) {
      console.log("Erreur SQL (GET offres_ski) :", err);
      return res.status(500).json({ error: "Erreur récupération offres ski" });
    }

    res.json(results);

  });

});


/* =========================
   ARTICLES BLOG
========================= */

app.get("/api/articles", (req, res) => {
  const sql = `
    SELECT a.*, u.nom_utilisateur as auteur
    FROM articles_blog a
    LEFT JOIN utilisateurs u ON a.auteur_id = u.id
    ORDER BY a.date_publication DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Erreur SQL (GET articles) :", err);
      return res.status(500).json({ error: "Erreur récupération articles" });
    }
    res.json(results);
  });
});


/* =========================
   NEWSLETTER
========================= */

app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email obligatoire" });

  db.query("INSERT INTO newsletter (email) VALUES (?)", [email], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Cet email est déjà inscrit !" });
      }
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.status(201).json({ message: "Inscription réussie !" });
  });
});

/* =========================
   AUTHENTIFICATION
========================= */

app.post("/api/register", (req, res) => {
  const { nom, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.json({ error: "Erreur serveur" });

    const sql = `
    INSERT INTO utilisateurs
    (nom_utilisateur, email, mot_de_passe, date_inscription)
    VALUES (?, ?, ?, NOW())
    `;

    db.query(sql, [nom, email, hash], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") return res.json({ error: "Ce compte existe déjà" });
        return res.json({ error: "Erreur serveur" });
      }
      res.json({ message: "Compte créé avec succès", user: { nom_utilisateur: nom, email } });
    });
  });
});


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM utilisateurs WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (result.length === 0) return res.status(401).json({ error: "Email ou mot de passe incorrect" });

    bcrypt.compare(password, result[0].mot_de_passe, (err, match) => {
      if (err || !match) return res.status(401).json({ error: "Email ou mot de passe incorrect" });
      res.json({ message: "Connexion réussie", user: result[0] });
    });
  });
});


/* =========================
   CONTACT
========================= */

app.post("/api/contact", (req, res) => {

  const { nom, email, sujet, message } = req.body;

  const sql = `
  INSERT INTO messages_contact
  (nom, email, sujet, message)
  VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nom, email, sujet, message], (err, result) => {

    if (err) {
      console.log("Erreur SQL contact :", err);
      return res.status(500).json({ error: "Erreur envoi message" });
    }

    res.json({
      success: true,
      message: "Message envoyé avec succès"
    });

  });

});

/* =========================
   RESERVATIONS
========================= */

// Toutes les réservations (admin)
app.get("/api/reservations", (req, res) => {
  const sql = `
    SELECT r.*, u.nom_utilisateur, u.email 
    FROM reservations r
    JOIN utilisateurs u ON r.utilisateur_id = u.id
    ORDER BY r.date_reservation DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur récupération réservations" });
    res.json(results);
  });
});

// Réservations d'un user
app.get("/api/reservations/:userId", (req, res) => {
  const sql = "SELECT * FROM reservations WHERE utilisateur_id = ? ORDER BY date_reservation DESC";
  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur récupération réservations" });
    res.json(results);
  });
});

// Ajouter une réservation
app.post("/api/reservations", (req, res) => {
  const { utilisateur_id, activite_nom, date_debut, date_fin, nb_personnes, prix } = req.body;
  const sql = `INSERT INTO reservations (utilisateur_id, activite_nom, date_debut, date_fin, nb_personnes, prix) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [utilisateur_id, activite_nom, date_debut, date_fin, nb_personnes, prix], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur ajout réservation" });
    res.status(201).json({ message: "Réservation créée", id: result.insertId });
  });
});

// Supprimer une réservation
app.delete("/api/reservations/:id", (req, res) => {
  const sql = "DELETE FROM reservations WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur suppression réservation" });
    res.json({ message: "Réservation supprimée" });
  });
});

/* =========================
   STATS ADMIN
========================= */

app.get("/api/admin/stats", (req, res) => {
  const sqlUsers = "SELECT COUNT(*) as total FROM utilisateurs";
  const sqlResa = "SELECT COUNT(*) as total FROM reservations";
  db.query(sqlUsers, (err, users) => {
    if (err) return res.status(500).json({ error: "Erreur stats" });
    db.query(sqlResa, (err2, resas) => {
      if (err2) return res.status(500).json({ error: "Erreur stats" });
      res.json({
        nb_utilisateurs: users[0].total,
        nb_reservations: resas[0].total
      });
    });
  });
});


/* =========================
   LANCEMENT SERVEUR
========================= */

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


