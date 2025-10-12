import React from "react"; 
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../styles/pages/Home.css";
import Wrapper from "../components/Templates/Wrapper";
import Sidebar from "../components/organisms/Sidebar";
import Header from "../components/molecules/Header";
import NavCarrito from "../components/organisms/NavCarrito";
import MainCarrito from "../components/organisms/MainCarrito";


function Carrito() {


    return(
        <Wrapper class="wrapper">
            <Sidebar>
                <Header>
                </Header>
                <NavCarrito>
                </NavCarrito>
                <Footer>
                </Footer>
            </Sidebar>
            <MainCarrito>
            </MainCarrito>
        </Wrapper>
    )
}

export default Carrito;