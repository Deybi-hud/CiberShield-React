import React from 'react';
import Wrapper from '../components/templates/Wrapper';
import Sidebar from '../components/organisms/Sidebar';
import Text from '../components/atoms/Text';
import '../styles/pages/Home.css';


const Home = () => {
  return (
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
};

export default Home;
