import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import '../../styles/molecules/CartItem.css';

const CartItem = ({ producto, onEliminar }) => {
  if (!producto) {
    return null;
  }

  const precio = producto.precio || 0;
  const cantidad = producto.cantidad || 0;
  const precioTotal = typeof precio === 'number' ? precio * cantidad : 0;
  const imagen = producto.imagen || '/assets/react.svg';
  const nombre = producto.nombre || 'Producto sin nombre';

  const handleEliminar = () => {
    if (producto.id) {
      onEliminar(producto.id);
    }
  };

  return (
    <div className="carrito-producto">
      <Image src={imagen} alt={nombre} className="carrito-producto-imagen" />
      <div className="carrito-producto-info">
        <Text as="p" className="carrito-producto-titulo">{nombre}</Text>
      </div>
      <div className="carrito-producto-cantidad">
        <Text as="p" className="carrito-producto-label">Cantidad </Text>
        <Text as="p" className="carrito-producto-valor">{cantidad}</Text>
      </div>
      <div className="carrito-producto-precio-unitario">
        <Text as="p" className="carrito-producto-label">Precio Unitario</Text>
        <Text as="p" className="carrito-producto-valor">${typeof precio === 'number' ? precio.toLocaleString() : precio}</Text>
      </div>
      <div className="carrito-producto-total">
        <Text as="p" className="carrito-producto-label">Total</Text>
        <Text as="p" className="carrito-producto-valor">${typeof precioTotal === 'number' ? precioTotal.toLocaleString() : precioTotal}</Text>
      </div>
      <Button className="carrito-producto-eliminar" onClick={handleEliminar}><i className="bi bi-trash-fill"></i></Button>
    </div>
  );
};

export default CartItem;