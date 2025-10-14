import React from "react";


const MainCarrito = () => {
    <main>
        <Text as="h2" className="titulo-principal">
          Carrito
        </Text>
        
        <div className="contenedor-carrito">
          {carritoVacio && (
            <Text as="p" className="carrito-vacio"> Tu carrito está vacío.{' '}
              <i className="bi bi-emoji-frown"></i>
            </Text>
          )}

          {!carritoVacio && (
            <>
              <div className="carrito-productos">
                {productosEnCarrito.map((producto) => (
                  <CartItem
                    key={producto.id}
                    producto={producto}
                    onEliminar={eliminarDelCarrito}/>
                ))}
              </div>

              <div className="carrito-acciones">
                    <Button className="carrito-acciones-vaciar" onClick={handleVaciar}>Vaciar Carrito
                    </Button>
                <div className="carrito-acciones-derecha">
                  <div className="carrito-acciones-total"><Text as="p">Total:</Text>
                    <Text as="p"> ${total.toLocaleString()}</Text>
                  </div>
                    <Button
                        className="carrito-acciones-comprar"
                        onClick={handleComprar}>Comprar ahora
                    </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
}; 

export default MainCarrito;