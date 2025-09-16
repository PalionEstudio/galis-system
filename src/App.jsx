/* App.jsx */
import './styles/App.css';
import { useState, useEffect } from 'react';
import Producto from './components/Producto';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch('http://localhost:4000/productos')
    .then(res => res.json())
    .then(data => {
      const productosConStock = data.map(p => ({ ...p, stock: Number(p.stock), cantidad: 0 }));

      // Ordenar: primero por stock descendente, luego por nombre alfabéticamente
      productosConStock.sort((a, b) => {
        if (b.stock !== a.stock) return b.stock - a.stock;
        return a.nombre.localeCompare(b.nombre);
      });

      setProductos(productosConStock);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError('Error al cargar los productos');
      setLoading(false);
    });
}, []);


  const handleCantidadChange = (index, nuevaCantidad) => {
    setProductos(prev => {
      const copia = [...prev];
      copia[index].cantidad = nuevaCantidad;
      return copia;
    });
  };

  const totalPedido = productos.reduce((total, prod) => total + prod.precio * prod.cantidad, 0);

  if (loading) return <div className="App">Cargando productos...</div>;
  if (error) return <div className="App">{error}</div>;

  return (
    <div className="App">
      <h1>Listado de Productos</h1>
 <div className="encabezado">
  <span className="columna-nombre">Producto</span>
  <span className="columna-precio">Precio</span>
  <span className="columna-stock">Stock</span>
  <span className="columna-controles">Cantidad</span>
  <span className="columna-extra">Reset</span>
</div>


      {productos.map((producto, index) => (
        <Producto
          key={index}
          index={index}
          nombre={producto.nombre}
          precio={producto.precio}
          stock={producto.stock}
          cantidad={producto.cantidad}
          onCantidadChange={handleCantidadChange}
        />
      ))}

      <div className="total-flotante">
        Total pedido: ${totalPedido.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
      </div>
    </div>
  );
}

export default App;