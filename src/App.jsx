import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import PerfilCliente from './pages/PerfilCliente';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<PerfilCliente />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
