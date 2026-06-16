import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Connexion(){

const navigate = useNavigate();

const [mode,setMode] = useState("login");

const [nom,setNom] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [notification,setNotification] = useState("");
const [notifType,setNotifType] = useState("success");


/* ---------- INSCRIPTION ---------- */

async function handleRegister(e){
e.preventDefault();

try{

const res = await fetch("http://localhost:5000/api/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
nom,
email,
password
})
});

const data = await res.json();

if(data.error){

setNotification(data.error);
setNotifType("error");

}else{

localStorage.setItem("user", JSON.stringify(data.user));

setNotification("Compte créé avec succès !");
setNotifType("success");

setTimeout(()=>{
navigate("/");
},1500);

}

setTimeout(()=>{
setNotification("");
},3000);

}catch(err){

console.log(err);
setNotification("Erreur serveur");
setNotifType("error");

}

}


/* ---------- CONNEXION ---------- */

async function handleLogin(e){
e.preventDefault();

try{

const res = await fetch("http://localhost:5000/api/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
});

const data = await res.json();

if(data.error){

setNotification(data.error);
setNotifType("error");

}else{

localStorage.setItem("user", JSON.stringify(data.user));

setNotification("Connexion réussie !");
setNotifType("success");

setTimeout(()=>{
navigate("/");
},1000);

}

setTimeout(()=>{
setNotification("");
},3000);

}catch(err){

console.log(err);
setNotification("Erreur serveur");
setNotifType("error");

}

}


return(

<div style={{maxWidth:"500px",margin:"80px auto",textAlign:"center"}}>

<h1 style={{fontSize:"50px",marginBottom:"10px"}}>
Mon compte
</h1>

<p style={{color:"#6b7280",marginBottom:"40px"}}>
Connectez-vous ou créez un compte pour accéder à votre espace.
</p>


<div style={{
background:"#f9fafb",
padding:"40px",
borderRadius:"16px",
border:"1px solid #e5e7eb"
}}>


{/* NOTIFICATION */}

{notification && (

<div style={{
background: notifType==="success" ? "#dcfce7" : "#fee2e2",
color: notifType==="success" ? "#166534" : "#991b1b",
padding:"12px",
borderRadius:"8px",
marginBottom:"20px",
fontWeight:"500"
}}>
{notification}
</div>

)}


{/* SWITCH CONNEXION / INSCRIPTION */}

<div style={{
display:"flex",
background:"#e5e7eb",
borderRadius:"10px",
marginBottom:"30px"
}}>

<button
onClick={()=>setMode("login")}
style={{
flex:1,
padding:"10px",
border:"none",
borderRadius:"10px",
cursor:"pointer",
background:mode==="login"?"white":"transparent",
fontWeight:"500"
}}
>
Connexion
</button>

<button
onClick={()=>setMode("register")}
style={{
flex:1,
padding:"10px",
border:"none",
borderRadius:"10px",
cursor:"pointer",
background:mode==="register"?"white":"transparent",
fontWeight:"500"
}}
>
Inscription
</button>

</div>


{/* FORMULAIRE INSCRIPTION */}

{mode==="register" && (

<form onSubmit={handleRegister} style={{textAlign:"left"}}>

<label>Nom complet</label>

<input
placeholder="Jean Dupont"
style={input}
value={nom}
onChange={(e)=>setNom(e.target.value)}
/>

<label>Email</label>

<input
placeholder="votre@email.fr"
style={input}
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<label>Mot de passe</label>

<input
type="password"
placeholder="••••••"
style={input}
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button type="submit" style={button}>
Créer mon compte
</button>

</form>

)}



{/* FORMULAIRE CONNEXION */}

{mode==="login" && (

<form onSubmit={handleLogin} style={{textAlign:"left"}}>

<label>Email</label>

<input
placeholder="votre@email.fr"
style={input}
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<label>Mot de passe</label>

<input
type="password"
placeholder="••••••"
style={input}
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button type="submit" style={button}>
Se connecter
</button>

</form>

)}

</div>

</div>

)

}


const input={
width:"100%",
padding:"12px",
marginTop:"8px",
marginBottom:"20px",
borderRadius:"8px",
border:"1px solid #e5e7eb"
}

const button={
width:"100%",
padding:"14px",
background:"#2f6f49",
color:"white",
border:"none",
borderRadius:"10px",
fontSize:"16px",
cursor:"pointer"
}

export default Connexion;