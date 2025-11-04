import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Carrito from './pages/Carrito'; 
import Login from './pages/Login';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './styles/global.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path ="/login" element ={<Login />} />
      </Routes>
    </>
  );
}

export default App;
