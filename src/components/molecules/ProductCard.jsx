import React from "react";
import Button from "../atoms/Button";
import Image from "../atoms/Image"; 

const ProductCard = ({ producto, onAddToCart }) => {
  return (
    <div className="producto">
      <Image className="producto-imagen" src={producto.imagen} alt={producto.nombre} />
      <div className="producto-detalles">
        <h3 className="producto-titulo">{producto.nombre}</h3>
        <p className="producto-precio">${producto.precio.toLocaleString()}</p>
        <p className="producto-descripcion">{producto.descripcion}</p>
        <Button className="producto-agregar" onClick={() => onAddToCart(producto)}>Agregar</Button>
      </div>
    </div>
  );
};

export default ProductCard;
