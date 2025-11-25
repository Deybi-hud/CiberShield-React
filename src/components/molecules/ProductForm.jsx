import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import '../../styles/molecules/ProductForm.css';

const ProductForm = ({ onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nombreProducto: '',
    sku: '',
    precio: '',
    stock: '',
    imagen: '',
    marcaNombre: '',
    nombreCategoria: '',
    subcategoria: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.nombreProducto) newErrors.nombreProducto = 'Nombre es requerido';
    if (!formData.sku) newErrors.sku = 'SKU es requerido';
    if (!formData.precio || formData.precio <= 0) newErrors.precio = 'Precio válido es requerido';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Stock válido es requerido';
    if (!formData.marcaNombre) newErrors.marcaNombre = 'Nombre de marca es requerida';
    if (!formData.nombreCategoria) newErrors.nombreCategoria = 'nombre de categoria es requerida';
    if (!formData.subcategoria) newErrors.subcategoria = 'nombre de subcategoria es requerida';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSubmit = {
      ...formData,
      nombreProducto: String(formData.nombreProducto),
      sku: String(formData.sku),
      precio: Number(formData.precio),
      imagen: String(formData.imagen),
      stock: Number(formData.stock),
      marcaNombre: String(formData.marcaNombre),
      nombreCategoria: String(formData.nombreCategoria),
      subcategoria: String(formData.subcategoria)
    };

    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-row">
        <Input
          type="text"
          name="nombreProducto"
          placeholder="Nombre del producto"
          value={formData.nombreProducto}
          onChange={handleChange}
          error={errors.nombreProducto}
          required
          className="form-input"
        />
        
        <Input
          type="text"
          name="sku"
          placeholder="SKU (Código único)"
          value={formData.sku}
          onChange={handleChange}
          error={errors.sku}
          required
          className="form-input"
        />
      </div>

      <div className="form-row">
        <Input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formData.precio}
          onChange={handleChange}
          error={errors.precio}
          required
          className="form-input"
        />
        
        <Input
          type="number"
          name="stock"
          placeholder="Stock disponible"
          value={formData.stock}
          onChange={handleChange}
          error={errors.stock}
          required
          className="form-input"
        />
      </div>

      <Input
        type="text"
        name="descripcion"
        placeholder="Descripción del producto"
        value={formData.descripcion}
        onChange={handleChange}
        error={errors.descripcion}
        className="form-input"
      />

      <Input
        type="text"
        name="imagen"
        placeholder="URL de la imagen"
        value={formData.imagen}
        onChange={handleChange}
        error={errors.imagen}
        className="form-input"
      />

      <div className="form-row">
        <div className="form-input">
          <label>Categoría</label>
          <select 
            name="categoriaId" 
            value={formData.categoriaId} 
            onChange={handleChange}
            className={errors.categoriaId ? 'error' : ''}
          >
            <option value="">Selecciona una categoría</option>
            <option value="1">Hardware</option>
            <option value="2">Software</option>
          </select>
          {errors.categoriaId && <span className="error-message">{errors.categoriaId}</span>}
        </div>

        <div className="form-input">
          <label>Marca (opcional)</label>
          <select 
            name="marcaId" 
            value={formData.marcaId} 
            onChange={handleChange}
          >
            <option value="">Sin marca</option>
            <option value="1">CiberShield</option>
            <option value="2">SecureTech</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <Button type="button" onClick={onCancel} className="boton-cancelar">
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} className="boton-confirmar">
          {loading ? 'Creando...' : 'Crear Producto'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;