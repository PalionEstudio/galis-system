import './Producto.css';

function Producto({ index, nombre, precio, stock, cantidad, onCantidadChange }) {
  // Convertir stock a número y asegurar que sea al menos 0
  const stockNum = Number(stock) || 0;

  const incrementar = () => {
    if (cantidad < stockNum) {
      onCantidadChange(index, cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 0) {
      onCantidadChange(index, cantidad - 1);
    }
  };

  return (
    <div className="producto-fila">
      <span className="columna-nombre">{nombre}</span>
      <span className="columna-precio">
        {precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
      </span>

      <span className="columna-stock">
        <span className={stockNum - cantidad > 0 ? 'disponible' : 'sin-stock'}>
          {stockNum - cantidad > 0 ? `Disponible: ${stockNum - cantidad}` : 'Sin stock'}
        </span>
        <br />
        <span>Seleccionado: {cantidad}</span>
      </span>

      <div className="columna-controles">
        <button onClick={decrementar} disabled={cantidad === 0}>-</button>
        <button onClick={incrementar} disabled={cantidad === stockNum}>+</button>
      </div>
    </div>
  );
}

export default Producto;
