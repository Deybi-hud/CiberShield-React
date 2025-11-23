import React from "react";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import Link from "../atoms/Link";
import Text from "../atoms/Text";
import '../../styles/molecules/ProductCard.css';

const ProductCard = ({ producto, onAddToCart }) => {
  if (!producto || !producto.id) {
    return null;
  }

  const precio = producto.precio || 0;
  const nombre = producto.nombre || 'Producto sin nombre';
  const descripcion = producto.descripcion || 'Sin descripción';
  const imagen = producto.imagen || '/assets/react.svg';

  return (
    <div className="producto">
      <Link to={`/producto/${producto.id}`}>
        <Image className="producto-imagen" src={imagen} alt={nombre} />
      </Link>

      <div className="producto-detalles">
        <Link to={`/producto/${producto.id}`} className="producto-link-titulo">
          <Text as="h3" className="producto-titulo">{nombre}</Text>
        </Link>
        <Text as="p" className="producto-precio">${typeof precio === 'number' ? precio.toLocaleString() : precio}</Text>
        <Text as="p" className="producto-descripcion">{descripcion}</Text>
        <Button className="producto-agregar" onClick={() => onAddToCart(producto)}>Agregar</Button>
      </div>
    </div>
  );
};

export default ProductCard;