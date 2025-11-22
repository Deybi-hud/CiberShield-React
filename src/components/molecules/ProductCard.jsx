import React from "react";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import Link from "../atoms/Link";
import '../../styles/molecules/ProductCard.css';

const ProductCard = ({ producto, onAddToCart }) => {
  return (
    <div className="producto">
      <Link to={`/producto/${producto.id}`}>
        <Image className="producto-imagen" src={producto.imagen} alt={producto.nombre} />
      </Link>

      <div className="producto-detalles">
        <Link to={`/producto/${producto.id}`} className="producto-link-titulo">
          <Text as="h3" className="producto-titulo">{producto.nombre}</Text>
        </Link>
        <Text as="p" className="producto-precio">${producto.precio.toLocaleString()}</Text>
        <Text as="p" className="producto-descripcion">{producto.descripcion}</Text>
        <Button className="producto-agregar" onClick={() => onAddToCart(producto)}>Agregar</Button>
      </div>
    </div>
  );
};

export default ProductCard;