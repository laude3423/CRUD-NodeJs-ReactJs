
import './index.css';
import Home from './pages/users/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Ajout from './pages/users/Ajout';
import Detail from './pages/users/Detail';
import Editer from './pages/users/Editer';
import Livre from './pages/livre/Livre';
import AjoutLivre from './pages/livre/AjoutLivre';
import ModeLivre from './pages/livre/ModeLivre';
import Emprunt from './pages/emprunt/Emprunt';
import EditEmprunt from './pages/emprunt/EditEmprunt';
import AjoutEmprunt from './pages/emprunt/AjoutEmprunt';
import Emprunteur from './pages/emprunteur/Emprunteur';
import EditEmprunteur from './pages/emprunteur/EditEmprunteur';
import AjoutEmprunteur from './pages/emprunteur/AjoutEmprunteur';
import AjoutExemplaire from './pages/exemplaire/AjoutExemplaire';
import EditExemplaire from './pages/exemplaire/EditExemplaire';
import Exemplaire from './pages/exemplaire/Exemplaire';
import Sidebar from './components/Sidebar';
import Acceuil from './admin/Acceuil';

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/users" element={<Home />} />
          <Route path="users/acceuil" element={<Acceuil />} />
          <Route path="users/create" element={<Ajout />} />
          <Route path="users/detail/:id" element={<Detail />} />
          <Route path="users/edit/:id" element={<Editer />} />

          <Route path="/livre" element={<Livre />} />
          <Route path="/livre/create" element={<AjoutLivre />} />
          <Route path="/editLivre/:idLivre" element={<ModeLivre />} />

          <Route path="/emprunt" element={<Emprunt />} />
          <Route path="/emprunt/create" element={<AjoutEmprunt />} />
          <Route path="/editLivre/:id" element={<EditEmprunt />} />

          <Route path="/emprunteur" element={<Emprunteur />} />
          <Route path="/emprunteur/create" element={<AjoutEmprunteur />} />
          <Route path="/emprunteur/edit/:id" element={<EditEmprunteur />} />

          <Route path="/exemplaire" element={<Exemplaire />} />
          <Route path="/exemplaire/create" element={<AjoutExemplaire />} />
          <Route path="/exemplaire/edit/:id" element={<EditExemplaire />} />

        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
