import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import ClientePerfil from './pages/cliente/ClientePerfil';
import ClientePedidos from './pages/cliente/ClientePedidos';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminPedidos from './pages/admin/AdminPedidos';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

function App() {
  return (
    <>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/producto/:id" element={<ProductDetail />} />

        {/* Rutas Cliente */}
        <Route 
          path="/cliente/perfil" 
          element={
            <ProtectedRoute>
              <ClientePerfil />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cliente/pedidos" 
          element={
            <ProtectedRoute>
              <ClientePedidos />
            </ProtectedRoute>
          } 
        />

        {/* Rutas Admin */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/productos" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminProductos />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/usuarios" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminUsuarios />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/pedidos" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPedidos />
            </ProtectedRoute>
          } 
        />

        {/* Ruta 404 */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
