import React from "react"; 
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../styles/pages/Home.css";
import Wrapper from "../components/Templates/Wrapper";
import Header from "../components/molecules/Header";
import NavCarrito from "../components/organisms/NavCarrito";
import Footer from "../components/molecules/Footer";
import MainCarrito from "../components/organisms/MainCarrito";


function Carrito() {



    return(
        <Wrapper>
            <SidebarCarrito>
                <Header>
                </Header>
                <NavCarrito>
                </NavCarrito>
                <Footer>
                </Footer>
            </SidebarCarrito>
            <MainCarrito>
            </MainCarrito>

        </Wrapper>
    )
}

export default Carrito;