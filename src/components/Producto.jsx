import './Producto.css';
import { FaTrash, FaEdit } from 'react-icons/fa'; // tacho y editar

function Producto({ producto, onCantidadChange, onEditar }) {
  const incrementar = () => {
    if (producto.cantidad < producto.stock) {
      onCantidadChange(producto.id, producto.cantidad + 1);
    }
  };

  const decrementar = () => {
    if (producto.cantidad > 0) {
      onCantidadChange(producto.id, producto.cantidad - 1);
    }
  };

  const resetCantidad = () => {
    if (producto.cantidad > 0) {
      onCantidadChange(producto.id, 0);
    }
  };

  return (
    <div className="producto-fila">
      <span className="columna-nombre">{producto.nombre}</span>
      <span className="columna-precio">
        {producto.precio.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })}
      </span>

      <div className="columna-cantidad">
        <button onClick={decrementar} disabled={producto.cantidad === 0}>-</button>
        <span className="cantidad-seleccionada">{producto.cantidad}</span>
        <button onClick={incrementar} disabled={producto.cantidad === producto.stock}>+</button>

        {/* Botón tacho de basura alineado */}
        <button
          className="boton-reset"
          onClick={resetCantidad}
          disabled={producto.cantidad === 0}
          style={{ opacity: producto.cantidad > 0 ? 1 : 0.2 }}
        >
          <FaTrash />
        </button>
      </div>

      <span className="columna-stock">
        <span className={producto.stock - producto.cantidad > 0 ? 'disponible' : 'sin-stock'}>
          Stock: {producto.stock - producto.cantidad}
        </span>
      </span>

     <div className="columna-admin">
  <button className="boton-editar" onClick={() => onEditar(producto)}>
    <FaEdit />
  </button>
</div>

    </div>
  );
}

export default Producto;
