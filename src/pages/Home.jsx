
import ProductoService from "../services/public/productoService.js";

useEffect(() => {
  const cargarProductos = async () => {
    try {
      const data = await ProductoService.getAll();
      const productos = await data.json();
      setProductos(productos);
      setProductosFiltrados(productos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };
  cargarProductos();
}, []);