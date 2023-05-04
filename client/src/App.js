
import './index.css';
import './App.css';
import Home from './pages/users/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Livre from './pages/livre/Livre';
import AjoutLivre from './pages/livre/AjoutLivre';
import ModeLivre from './pages/livre/ModeLivre';
import Emprunt from './pages/emprunt/Emprunt';
import EditEmprunt from './pages/emprunt/EditEmprunt';
import AjoutEmprunt from './pages/emprunt/AjoutEmprunt';
import Emprunteur from './pages/emprunteur/Emprunteur';
import EditEmprunteur from './pages/emprunteur/EditEmprunteur';
import AjoutEmprunteur from './pages/emprunteur/AjoutEmprunteur';
import Sidebar from './components/Sidebar';
import Acceuil from './admin/Acceuil';


function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users/acceuil" element={<Acceuil />} />

          <Route path="/livre" element={<Livre />} />
          <Route path="/livre/create" element={<AjoutLivre />} />
          <Route path="/editLivre/:idLivre" element={<ModeLivre />} />

          <Route path="/emprunt" element={<Emprunt />} />
          <Route path="/emprunt/create" element={<AjoutEmprunt />} />
          <Route path="/editLivre/:id" element={<EditEmprunt />} />

          <Route path="/emprunteur" element={<Emprunteur />} />
          <Route path="/emprunteur/create" element={<AjoutEmprunteur />} />
          <Route path="/emprunteur/edit/:id" element={<EditEmprunteur />} />

        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
