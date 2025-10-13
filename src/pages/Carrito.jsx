import React from "react"; 
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "../styles/pages/Home.css";
import Wrapper from "../components/Templates/Wrapper";
import SidebarCarrito from "../components/organisms/SidebarCarrito";
import NavCarrito from "../components/organisms/NavCarrito";

function Carrito() {

    return(
        <Wrapper>
            <SidebarCarrito></SidebarCarrito>
            
        </Wrapper>
    );
};

export default Carrito;
