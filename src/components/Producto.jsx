import { useState } from 'react';
import './Producto.css';

function Producto({ nombre, precio, stock }) {
  const [cantidad, setCantidad] = useState(0);

  // Función para aumentar cantidad, sin pasar el stock
  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  // Función para disminuir cantidad, sin pasar de 0
  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="producto-fila">
      <span className="col-nombre">{nombre}</span>
      <span className="col-precio">${precio.toLocaleString()}</span>
      <span className={`col-stock ${stock > 0 ? 'disponible' : 'sin-stock'}`}>
        {stock > 0 ? `${stock} unidad${stock > 1 ? 'es' : ''}` : 'Sin stock'}
      </span>
      <span className="col-cantidad-control">
        <button onClick={decrementar} disabled={cantidad === 0}>-</button>
        <span className="cantidad">{cantidad}</span>
        <button onClick={incrementar} disabled={cantidad === stock}>+</button>
      </span>
    </div>
  );
}

export default Producto;
