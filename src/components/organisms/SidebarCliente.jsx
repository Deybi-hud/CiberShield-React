import React from "react";
import Header from "../molecules/Header";
import NavCliente from "./NavCliente";
import Footer from "../molecules/Footer";
import "../../styles/organisms/Sidebar.css";

const SidebarCliente = () => {
  return (
    <aside>
      <Header />
      <NavCliente />
      <Footer />
    </aside>
  );
};

export default SidebarCliente;