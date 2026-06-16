import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Activites from "./pages/Activities";
import AjouterActivite from "./pages/AjouterActivite";
import Articles from "./pages/Articles";
import Videos from "./pages/Videos";
import RoutesPage from "./pages/Routes";
import Randonnee from "./pages/Randonnee";
import Ski from "./pages/Ski";
import Escalade from "./pages/Escalade";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Profil from "./pages/Profil";
import Connexion from "./pages/Connexion";




function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activites" element={<Activites />} />
        <Route path="/ajouter" element={<AjouterActivite />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/randonnee" element={<Randonnee />} />
        <Route path="/ski" element={<Ski />} />
        <Route path="/escalade" element={<Escalade />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
