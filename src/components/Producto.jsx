import './Producto.css';

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

  const resetear = () => {
    onCantidadChange(index, 0);
  };

  return (
    <div className="producto-fila">
      {/* Nombre */}
      <span className="columna-nombre">{nombre}</span>

      {/* Precio */}
      <span className="columna-precio">
        {precio.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}
      </span>

      {/* Stock */}
      <span className="columna-stock">
        <span className={stock - cantidad > 0 ? 'disponible' : 'sin-stock'}>
          Disponible: {stock - cantidad}
        </span>
      </span>

      {/* Controles de cantidad */}
      <div className="columna-controles">
        <button onClick={decrementar} disabled={cantidad === 0}>-</button>
        <span className="cantidad-seleccionada">{cantidad}</span>
        <button onClick={incrementar} disabled={cantidad === stock}>+</button>
      </div>

      {/* Columna extra para reset y futuros botones */}
      <div className="columna-acciones">
        {cantidad > 0 && (
          <button onClick={resetear} className="boton-reset">X</button>
        )}
      </div>
    </div>
  );
}

export default Producto;
