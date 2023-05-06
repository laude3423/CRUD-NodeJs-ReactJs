
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/users/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Livre from './pages/livre/Livre';
import Emprunt from './pages/emprunt/Emprunt';
import Emprunteur from './pages/emprunteur/Emprunteur';
import Sidebar from './components/Sidebar';
import Acceuil from './admin/Acceuil';
import Login from './pages/users/Login';
import Register from './pages/users/Register';


function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="users/acceuil" element={<Acceuil />} />
          <Route path="/livre" element={<Livre />} />
          <Route path="/emprunt" element={<Emprunt />} />
          <Route path="/emprunteur" element={<Emprunteur />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
