import React from "react";
import Header from "../molecules/Header";
import NavMenu from "./NavMenu";
import Footer from "../molecules/Footer";
import SearchBar from "../molecules/SearchBar"; 
import "../../styles/organisms/Sidebar.css";

const SidebarHome = ({ categoriaActiva, filtrarPorCategoria, productosEnCarrito, onSearch }) => {
  return (
    <aside>
      <div>
        <Header />
        <SearchBar onSearch={onSearch} />
      </div>

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