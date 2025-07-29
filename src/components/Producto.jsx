import './Producto.css';

function Producto({ nombre, precio, stock }) {
  return (
    <div className="producto-fila">
      <span className="col-nombre">{nombre}</span>
      <span className="col-precio">${precio.toLocaleString()}</span>
      <span className={`col-stock ${stock > 0 ? 'disponible' : 'sin-stock'}`}>
        {stock > 0 ? 'Disponible' : 'Sin stock'}
      </span>
    </div>
  );
}

export default Producto;
