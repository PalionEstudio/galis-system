import './Producto.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Producto({ producto, onCantidadChange, abrirModal }) {
  const { id, nombre, precio, stock, cantidad } = producto;

  const incrementar = () => {
    if (cantidad < stock) onCantidadChange(id, cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 0) onCantidadChange(id, cantidad - 1);
  };

  const resetCantidad = () => {
    if (cantidad > 0) onCantidadChange(id, 0);
  };

  return (
    <div className="producto-fila">
      <span className="columna-nombre">{nombre}</span>
      <span className="columna-precio">
        {precio.toLocaleString('es-AR', { style:'currency', currency:'ARS', minimumFractionDigits:0, maximumFractionDigits:0 })}
      </span>
      <div className="columna-controles">
        <button onClick={decrementar} disabled={cantidad===0}>-</button>
        <span className="cantidad-seleccionada">{cantidad}</span>
        <button onClick={incrementar} disabled={cantidad===stock}>+</button>
        <button className="boton-reset" onClick={resetCantidad} disabled={cantidad===0}>
          <FaTrash />
        </button>
      </div>
      <span className="columna-stock">{stock - cantidad}</span>
      <div className="columna-admin">
        <button className="boton-editar" onClick={() => abrirModal(producto)}>
          <FaEdit />
        </button>
      </div>
    </div>
  );
}

export default Producto;
