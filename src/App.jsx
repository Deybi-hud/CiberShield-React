import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Carrito from './pages/Carrito'; // 🔹 IMPORTANTE: falta este import
import 'bootstrap-icons/font/bootstrap-icons.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
    </>
  );
}

export default App;
