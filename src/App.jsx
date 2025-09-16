import './styles/App.css';
import { useState, useEffect } from 'react';
import Producto from './components/Producto';
import { FaShoppingCart } from 'react-icons/fa'; // ícono de carrito

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroStock, setFiltroStock] = useState('Todos'); 
  const [filtroCategoria, setFiltroCategoria] = useState('Todos'); 
  const [mostrarCarrito, setMostrarCarrito] = useState(false); 

  useEffect(() => {
    fetch('http://localhost:4000/productos')
      .then(res => res.json())
      .then(data => {
        const productosConId = data.map((p, i) => ({
          ...p,
          id: p.id || i,
          stock: Number(p.stock),
          cantidad: 0
        }));
        productosConId.sort((a, b) => {
          if (b.stock !== a.stock) return b.stock - a.stock;
          return a.nombre.localeCompare(b.nombre);
        });
        setProductos(productosConId);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar los productos');
        setLoading(false);
      });
  }, []);

  const handleCantidadChange = (id, nuevaCantidad) => {
    setProductos(prev => prev.map(p =>
      p.id === id ? { ...p, cantidad: nuevaCantidad } : p
    ));
  };

  const categorias = Array.from(new Set(productos.map(p => p.categoria))).sort();

  const productosFiltrados = productos.filter(p => {
    if (mostrarCarrito) return p.cantidad > 0;
    const cumpleStock = filtroStock === 'Todos' || (filtroStock === 'En Stock' && p.stock > 0);
    const cumpleCategoria = filtroCategoria === 'Todos' || p.categoria === filtroCategoria;
    return cumpleStock && cumpleCategoria;
  });

  const totalPedido = productos.reduce((total, prod) => total + prod.precio * prod.cantidad, 0);

  // Cantidad total de items seleccionados
  const totalItemsSeleccionados = productos.reduce((sum, prod) => sum + prod.cantidad, 0);

  if (loading) return <div className="App">Cargando productos...</div>;
  if (error) return <div className="App">{error}</div>;

  return (
    <div className="App">
      <h1>Listado de Productos</h1>

      {/* Filtros de stock */}
      <div className="filtros-stock">
        <button onClick={() => { setFiltroStock('Todos'); setMostrarCarrito(false); }} className={filtroStock === 'Todos' && !mostrarCarrito ? 'activo' : ''}>Todos</button>
        <button onClick={() => { setFiltroStock('En Stock'); setMostrarCarrito(false); }} className={filtroStock === 'En Stock' && !mostrarCarrito ? 'activo' : ''}>En Stock</button>
      </div>

      {/* Filtros de categoría */}
      <div className="filtros-categoria">
        <button onClick={() => { setFiltroCategoria('Todos'); setMostrarCarrito(false); }} className={filtroCategoria === 'Todos' && !mostrarCarrito ? 'activo' : ''}>Todos</button>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => { setFiltroCategoria(cat); setMostrarCarrito(false); }}
            className={filtroCategoria === cat && !mostrarCarrito ? 'activo' : ''}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setMostrarCarrito(true)}
          className={mostrarCarrito ? 'activo carrito' : 'carrito'}
        >
          <FaShoppingCart /> {totalItemsSeleccionados} item{totalItemsSeleccionados !== 1 ? 's' : ''}
        </button>
      </div>

      <div className="encabezado">
        <span>Producto</span>
        <span>Precio</span>
        <span>Stock</span>
        <span></span>
        <span></span>
      </div>

      {productosFiltrados.map(producto => (
        <Producto
          key={producto.id}
          id={producto.id}
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
