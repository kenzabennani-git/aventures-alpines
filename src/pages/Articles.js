import { useState, useEffect } from "react";

function Articles() {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [sort, setSort] = useState("date");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/articles")
      .then(res => res.json())
      .then(data => {
        setArticles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.log("Erreur récupération articles :", err);
        setLoading(false);
      });
  }, []);

  const categories = ["Toutes", "Alpinisme", "Randonnée", "Ski", "Sécurité"];

  const filteredArticles = articles
    .filter(a => selectedCategory === "Toutes" || a.categorie === selectedCategory)
    .sort((a, b) => {
      if (sort === "date") return new Date(b.date_publication) - new Date(a.date_publication);
      return b.id - a.id;
    });

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  async function handleNewsletter() {
    if (!newsletterEmail) return;
    try {
      const res = await fetch("http://localhost:5000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (data.error) {
        setNewsletterMsg(data.error);
      } else {
        setNewsletterMsg("Inscription réussie ! 🎉");
        setNewsletterEmail("");
      }
    } catch {
      setNewsletterMsg("Erreur serveur");
    }
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "80px auto", padding: "0 20px" }}>

      <h1 style={{ fontSize: "50px", marginBottom: "10px" }}>Articles</h1>
      <p style={{ color: "#6b7280", marginBottom: "30px" }}>
        Articles et récits d'aventures en montagne, rédigés par des passionnés et des experts.
      </p>

      {/* FILTRES */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: "8px 14px", borderRadius: "20px", border: "none", cursor: "pointer",
                background: selectedCategory === category ? "#166534" : "#e5e7eb",
                color: selectedCategory === category ? "white" : "#374151",
                fontSize: "14px"
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ marginLeft: "auto", padding: "8px", borderRadius: "6px", border: "1px solid #e5e7eb" }}
        >
          <option value="date">Date (récent)</option>
          <option value="id">Plus ancien</option>
        </select>
      </div>

      {/* ARTICLES */}
      {loading ? (
        <p>Chargement des articles...</p>
      ) : filteredArticles.length === 0 ? (
        <p style={{ color: "#6b7280" }}>Aucun article trouvé.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "30px" }}>
          {filteredArticles.map(article => (
            <div key={article.id} style={{
              background: "#f9fafb", borderRadius: "12px",
              overflow: "hidden", border: "1px solid #e5e7eb"
            }}>
              <img
                src={article.image_url}
                alt={article.titre}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "20px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#d97706" }}>
                  {article.categorie ? article.categorie.toUpperCase() : ""}
                </span>
                <h3 style={{ marginTop: "10px", marginBottom: "10px" }}>{article.titre}</h3>
                <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "15px" }}>
                  {article.contenu ? article.contenu.substring(0, 100) + "..." : ""}
                </p>
                <div style={{ display: "flex", gap: "15px", fontSize: "12px", color: "#6b7280" }}>
                  <span>👤 {article.auteur}</span>
                  <span>📅 {formatDate(article.date_publication)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NEWSLETTER */}
      <div style={{
        background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px",
        padding: "40px", marginTop: "80px", textAlign: "center",
        maxWidth: "600px", marginLeft: "auto", marginRight: "auto"
      }}>
        <div style={{ fontSize: "30px", marginBottom: "10px" }}>✉</div>
        <h3 style={{ marginBottom: "10px" }}>Restez informé</h3>
        <p style={{ color: "#6b7280", marginBottom: "20px" }}>
          Abonnez-vous à notre newsletter pour recevoir les derniers articles et actualités.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <input
            placeholder="Votre adresse email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e5e7eb", width: "250px" }}
          />
          <button
            onClick={handleNewsletter}
            style={{
              background: "#166534", color: "white", border: "none",
              padding: "10px 20px", borderRadius: "8px", cursor: "pointer"
            }}
          >
            S'abonner
          </button>
        </div>
        {newsletterMsg && (
          <p style={{ marginTop: "12px", color: newsletterMsg.includes("réussie") ? "#166534" : "#dc2626", fontWeight: "500" }}>
            {newsletterMsg}
          </p>
        )}
      </div>

    </div>
  );
}

export default Articles;
