import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const CartItem = ({ producto, onEliminar }) => {
  const precioTotal = producto.precio * producto.cantidad;

  const handleEliminar = () => {
    if (producto.id) {
      onEliminar(producto.id);
    }
  };

  return (
    <div className="carrito-producto">

      <Image src={producto.imagen} alt={producto.nombre} className="carrito-producto-imagen"/>

      <div className="carrito-producto-info">
        <Text as="p" className="carrito-producto-titulo">
          {producto.nombre}
        </Text>

        <Text as="small" className="carrito-producto-descripcion">
          {producto.descripcion}
        </Text>
      </div>

      <div className="carrito-producto-cantidad">
        <Text as="p" className="carrito-producto-label">
          Cantidad
        </Text>

        <Text as="p" className="carrito-producto-valor">
          {producto.cantidad}
        </Text>
      </div>

      <div className="carrito-producto-precio-unitario">
        <Text as="p" className="carrito-producto-label">
          Precio Unitario
        </Text>

        <Text as="p" className="carrito-producto-valor">
          ${producto.precio.toLocaleString()}
        </Text>
      </div>

      <div className="carrito-producto-total">
        <Text as="p" className="carrito-producto-label">
          Total
        </Text>

        <Text as="p" className="carrito-producto-valor">
          ${precioTotal.toLocaleString()}
        </Text>
      </div>

      <Button
        className="carrito-producto-eliminar"
        onClick={handleEliminar}
      >
        <i className="bi bi-trash-fill"></i>
      </Button>

    </div>
  );
};

export default CartItem;