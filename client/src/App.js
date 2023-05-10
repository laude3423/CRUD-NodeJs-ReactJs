
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/users/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Livre from './pages/livre/Livre';
import Emprunt from './pages/emprunt/Emprunt';
import Emprunteur from './pages/emprunteur/Emprunteur';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import Start from './pages/users/Start';
import AdminHome from './admin/AdminHome';
import AdminLogin from './admin/AdminLogin';
import EmpruntAudit from './admin/EmpruntAudit';
import EmprunteurAudit from './admin/EmprunteurAudit';
import LivreAudit from './admin/LivreAudit';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/livre" element={<Livre />} />
        <Route path="/emprunt" element={<Emprunt />} />
        <Route path="/emprunteur" element={<Emprunteur />} />
        <Route path="/emprunteurAudit" element={<EmprunteurAudit />} />
        <Route path="/empruntAudit" element={<EmpruntAudit />} />
        <Route path="/livreAudit" element={<LivreAudit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
