import { useState } from "react";

function Blog(){

const articles = [

{
id:1,
title:"Ski de fond : le guide complet",
excerpt:"Technique, équipement et meilleurs spots pour pratiquer le ski de fond dans les Alpes.",
image:"https://images.unsplash.com/photo-1551524164-6cf0ac3bfb77?auto=format&fit=crop&w=1200&q=80",
author:"Lucas Neige",
date:"28 janvier 2026",
category:"Ski",
popularity:65
},

{
id:2,
title:"Les plus belles via ferrata des Alpes",
excerpt:"Découvrez notre sélection des via ferrata les plus spectaculaires pour tous les niveaux.",
image:"https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80",
author:"Marie Lefèvre",
date:"5 février 2026",
category:"Alpinisme",
popularity:70
},

{
id:3,
title:"Sécurité en montagne : les règles essentielles",
excerpt:"Les précautions indispensables pour profiter de la montagne en toute sécurité, été comme hiver.",
image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
author:"Pierre Durand",
date:"12 février 2026",
category:"Sécurité",
popularity:92
},

{
id:4,
title:"Préparer sa saison de ski : nos conseils",
excerpt:"De la préparation physique au choix du matériel, voici notre guide complet pour une saison de ski réussie.",
image:"https://images.unsplash.com/photo-1551524164-6cf0ac3bfb77?auto=format&fit=crop&w=1200&q=80",
author:"Lucas Neige",
date:"20 février 2026",
category:"Ski",
popularity:76
},

{
id:5,
title:"Top 5 des randonnées familiales dans les Alpes",
excerpt:"Des sentiers accessibles à toute la famille avec des panoramas à couper le souffle.",
image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
author:"Sophie Alpin",
date:"28 février 2026",
category:"Randonnée",
popularity:88
},

{
id:6,
title:"Les bases de l'alpinisme : guide pour débutants",
excerpt:"Tout ce que vous devez savoir avant votre première ascension en montagne.",
image:"https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80",
author:"Jean Montagnard",
date:"5 mars 2026",
category:"Alpinisme",
popularity:95
}

];

const categories = ["Toutes","Alpinisme","Randonnée","Ski","Sécurité"];

const [selectedCategory,setSelectedCategory] = useState("Toutes");
const [sort,setSort] = useState("date");

const filtered = articles
.filter(a => selectedCategory === "Toutes" || a.category === selectedCategory)
.sort((a,b)=> sort === "popularity" ? b.popularity - a.popularity : b.id - a.id);

return(

<div style={{maxWidth:"1200px",margin:"80px auto"}}>

<h1 style={{fontSize:"50px",marginBottom:"10px"}}>Blog</h1>

<p style={{color:"#6b7280",marginBottom:"30px"}}>
Articles et récits d'aventures en montagne, rédigés par des passionnés et des experts.
</p>


{/* FILTRES */}

<div style={{
display:"flex",
alignItems:"center",
marginBottom:"40px"
}}>

<div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>

{categories.map(cat =>(

<button
key={cat}
onClick={()=>setSelectedCategory(cat)}
style={{
padding:"8px 14px",
borderRadius:"20px",
border:"none",
cursor:"pointer",
background:selectedCategory===cat?"#166534":"#e5e7eb",
color:selectedCategory===cat?"white":"#374151",
fontSize:"14px"
}}
>
{cat}
</button>

))}

</div>


<select
value={sort}
onChange={(e)=>setSort(e.target.value)}
style={{
marginLeft:"auto",
padding:"8px",
borderRadius:"6px",
border:"1px solid #e5e7eb"
}}
>

<option value="date">Date (récent)</option>
<option value="popularity">Popularité</option>

</select>

</div>


{/* ARTICLES */}

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr 1fr",
gap:"30px"
}}>

{filtered.map(article =>(

<div
key={article.id}
style={{
background:"#f9fafb",
borderRadius:"12px",
overflow:"hidden",
border:"1px solid #e5e7eb"
}}
>

<img
src={article.image}
alt={article.title}
style={{
width:"100%",
height:"200px",
objectFit:"cover"
}}
/>

<div style={{padding:"20px"}}>

<span style={{
fontSize:"12px",
fontWeight:"600",
color:"#d97706"
}}>
{article.category.toUpperCase()}
</span>

<h3 style={{
marginTop:"10px",
marginBottom:"10px"
}}>
{article.title}
</h3>

<p style={{
color:"#6b7280",
fontSize:"14px",
marginBottom:"15px"
}}>
{article.excerpt}
</p>

<div style={{
display:"flex",
gap:"15px",
fontSize:"12px",
color:"#6b7280"
}}>

<span>👤 {article.author}</span>
<span>📅 {article.date}</span>

</div>

</div>

</div>

))}

</div>


{/* NEWSLETTER */}

<div style={{
background:"#f9fafb",
border:"1px solid #e5e7eb",
borderRadius:"12px",
padding:"40px",
marginTop:"80px",
textAlign:"center",
maxWidth:"600px",
marginLeft:"auto",
marginRight:"auto"
}}>

<div style={{fontSize:"30px",marginBottom:"10px"}}>✉</div>

<h3 style={{marginBottom:"10px"}}>
Restez informé
</h3>

<p style={{color:"#6b7280",marginBottom:"20px"}}>
Abonnez-vous à notre newsletter pour recevoir les derniers articles et actualités.
</p>

<div style={{
display:"flex",
gap:"10px",
justifyContent:"center"
}}>

<input
placeholder="Votre adresse email"
style={{
padding:"10px",
borderRadius:"8px",
border:"1px solid #e5e7eb",
width:"250px"
}}
/>

<button style={{
background:"#166534",
color:"white",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
cursor:"pointer"
}}>
S'abonner
</button>

</div>

</div>

</div>

);

}

export default Blog;