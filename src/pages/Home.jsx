import React from "react";
import Text from "../components/atoms/Text";
import { Button } from "../components/atoms/Button";
import Header from "../components/organisms/Header";
import "../styles/pages/Home.css";
import { Wrapper } from "../components/Templates/Wrapper";
import {SideBar} from "../components/organisms/SideBar";

function Home() {

  return (
    <Wrapper>
      <SideBar>
        <Header>
          <h1 className="logo">CiberShield</h1>
          <li>
            <a className="boton-menu" href="/login">
              <button className="boton-iniciar-sesion boton-menu">
                <i className="bi bi-hand-index-thumb-fill"></i> Iniciar sesión
              </button>
            </a>
          </li>
        </Header>
        <NavMenu>

        </NavMenu>
        <footer>
          <p>© 2025 CiberShield</p>
          <p>CiberShield@gmail.com</p>
        </footer>
      </SideBar>

      <main>
        <h2 className="titulo-principal" id="titulo-principal">
          Todo los productos
        </h2>
        <div id="contenedor-productos" className="contenedor-productos">
          {/* Aquí se renderizan dinámicamente los productos */}
        </div>
      </main>
    </Wrapper>
  );


  
};

export default Home;
