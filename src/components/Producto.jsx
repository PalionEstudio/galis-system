import './Producto.css';

function Producto({ nombre, precio, stock }) {
  return (
    <div className="producto-fila">
      <span className="col-nombre">{nombre}</span>
      <span className="col-precio">${precio.toLocaleString()}</span>
     <span className={stock > 0 ? 'disponible' : 'sin-stock'}>
  {stock > 0 ? `${stock} unidad${stock > 1 ? 'es' : ''}` : 'Sin stock'}
</span>

    </div>
  );
}

export default Producto;
