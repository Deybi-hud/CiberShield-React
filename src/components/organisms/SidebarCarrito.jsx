import React from "react";
import Header from "../molecules/Header";
import Footer from "../molecules/Footer";
import NavCarrito from "./NavCarrito";
 

const SidebarCarrito = () => {

    return (
        <aside>
            <Header/>
            <NavCarrito/>
            <Footer/>
        </aside>
    );

};

export default SidebarCarrito;