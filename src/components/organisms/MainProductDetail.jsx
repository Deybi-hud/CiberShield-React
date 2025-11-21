import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import Link from "../atoms/Link";
import "../../styles/organisms/MainProductDetail.css"; 

const MainProductDetail = ({ producto, agregarAlCarrito }) => {
    if (!producto) return <main><Text>Cargando...</Text></main>;

    return (
        <main className="detalle-main">
            <div className="detalle-header">
                <Link to="/" className="btn-volver">
                    <i className="bi bi-arrow-left"></i> Volver al catálogo
                </Link>
            </div>

            <div className="detalle-contenedor">

                <div className="detalle-imagen-box">
                    <Image
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="detalle-imagen"
                    />
                </div>

                <div className="detalle-info">
                    <Text as="h2" className="detalle-titulo">{producto.nombre}</Text>
                    <Text as="p" className="detalle-precio">${producto.precio.toLocaleString()}</Text>

                    <div className="detalle-descripcion-box">
                        <Text as="h4">Descripción del producto</Text>
                        <Text as="p" className="detalle-texto">
                            {producto.descripcion || "Este producto cuenta con las mejores características de seguridad del mercado. Protege tu información con la garantía de CiberShield."}
                        </Text>
                    </div>

                    <div className="detalle-acciones">
                        <Button className="boton-detalle-agregar" onClick={() => agregarAlCarrito(producto)}>
                            Agregar al Carrito <i className="bi bi-cart-plus"></i>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MainProductDetail;