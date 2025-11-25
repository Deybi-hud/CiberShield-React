import React, { useState } from 'react';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import List from '../atoms/List';
import ListItem from '../atoms/ListItem';
import Modal from './Modal';
import ProductForm from './ProductForm';
import '../../styles/molecules/ProductManager.css';

const ProductManager = ({ onCrearProducto, onEliminarProducto }) => {
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCrearProducto = async (productoData) => {
    setLoading(true);
    try {
      await onCrearProducto(productoData);
      setShowCrearModal(false);
    } catch (error) {
      console.error('Error al crear producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarProducto = async () => {
    const productoId = prompt('Ingresa el ID del producto a eliminar:');
    if (productoId) {
      try {
        await onEliminarProducto(productoId);
        setShowEliminarModal(false);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  return (
    <div className="product-manager">
      <Text as="h3" className="manager-title">Gestión de Productos</Text>
      
      <List as="ul" className="manager-actions">
        <ListItem>
          <Button 
            className="boton-crear" 
            onClick={() => setShowCrearModal(true)}
          >
            <i className="bi bi-plus-circle"></i> Crear Nuevo Producto
          </Button>
        </ListItem>
        
        <ListItem>
          <Button 
            className="boton-eliminar" 
            onClick={() => setShowEliminarModal(true)}
          >
            <i className="bi bi-trash"></i> Eliminar Producto
          </Button>
        </ListItem>
      </List>

      <Modal
        isOpen={showCrearModal}
        onClose={() => setShowCrearModal(false)}
        title="Crear Nuevo Producto"
      >
        <ProductForm
          onSubmit={handleCrearProducto}
          onCancel={() => setShowCrearModal(false)}
          loading={loading}
        />
      </Modal>

      <Modal
        isOpen={showEliminarModal}
        onClose={() => setShowEliminarModal(false)}
        title="Eliminar Producto"
      >
        <div className="delete-confirmation">
          <Text as="p">¿Estás seguro de que quieres eliminar un producto?</Text>
          <Text as="p" className="warning-text">
            <i className="bi bi-exclamation-triangle"></i> Esta acción no se puede deshacer
          </Text>
          <div className="delete-actions">
            <Button onClick={() => setShowEliminarModal(false)} className="boton-cancelar">
              Cancelar
            </Button>
            <Button onClick={handleEliminarProducto} className="boton-eliminar-confirmar">
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductManager;