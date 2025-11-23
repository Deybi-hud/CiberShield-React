import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
<<<<<<< HEAD

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
=======
>>>>>>> parent of 6d23ee6 (feat: configuración completa frontend con backend - servicios, vistas cliente y admin)
      </Routes>
    </>
  );
}

export default App;
