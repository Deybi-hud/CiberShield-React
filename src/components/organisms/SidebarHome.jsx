import React from "react";
import Header from "../molecules/Header";
import NavMenu from "./NavMenu";
import Footer from "../molecules/Footer";
import "../../styles/organisms/Sidebar.css"; 

const SidebarHome = ({ categoriaActiva, filtrarPorCategoria, productosEnCarrito }) => {
  return (
    <aside>
      <Header />
      <NavMenu
        categoriaActiva={categoriaActiva}
        filtrarPorCategoria={filtrarPorCategoria}
        productosEnCarrito={productosEnCarrito}
      />
      <Footer />
    </aside>
  );
};

export default SidebarHome;
