import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Carrito from './pages/Carrito';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

function App() {
 return (
   <>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/Carrito" element={<Carrito />} />
     </Routes>
   </>
 );
}


export default App;