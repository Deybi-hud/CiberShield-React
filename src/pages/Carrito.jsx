import React from "react"; 
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../styles/pages/Home.css";
import Wrapper from '../components/templates/Wrapper';
import Sidebar from '../components/organisms/Sidebar';
import Text from '../components/atoms/Text';

const Carrito = () => {
    return(
    <Wrapper>
      <Sidebar />
      <main>
        <Text variant="h2" className="titulo-principal" id="titulo-principal">
          Todos los productos
        </Text>
        <div id="contenedor-productos" className="contenedor-productos">
          {/* Los productos se cargarán dinámicamente */}
        </div>
      </main>
    </Wrapper>
  );
}

export default Carrito;