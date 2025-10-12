import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

function App() {
 return (
   <>
     <Routes>
       <Route path="/" element={<Home />} />
     </Routes>
   </>
 );
}


export default App;