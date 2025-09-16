import './Producto.css';
import { FaTrash } from 'react-icons/fa'; // ícono de tacho de basura

function Producto({ index, nombre, precio, stock, cantidad, onCantidadChange }) {
  const incrementar = () => {
    if (cantidad < stock) {
      onCantidadChange(index, cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 0) {
      onCantidadChange(index, cantidad - 1);
    }
  };

  const resetCantidad = () => {
    if (cantidad > 0) {
      onCantidadChange(index, 0);
    }
  };

  return (
    <div className="producto-fila">
      <span className="columna-nombre">{nombre}</span>
      <span className="columna-precio">
        {precio.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })}
      </span>
      <span className="columna-stock">
        <span className={stock - cantidad > 0 ? 'disponible' : 'sin-stock'}>
          Stock: {stock - cantidad}
        </span>
      </span>
      <div className="columna-controles">
        <button onClick={decrementar} disabled={cantidad === 0}>-</button>
        <span className="cantidad-seleccionada">{cantidad}</span>
        <button onClick={incrementar} disabled={cantidad === stock}>+</button>
      </div>
      <div className="columna-extra">
        <button
          className="boton-reset"
          onClick={resetCantidad}
          disabled={cantidad === 0}
          style={{ opacity: cantidad > 0 ? 1 : 0.2 }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default Producto;
