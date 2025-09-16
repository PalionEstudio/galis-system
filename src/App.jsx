import './styles/App.css';
import { useState, useEffect } from 'react';
import Producto from './components/Producto';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroStock, setFiltroStock] = useState('Todos');
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');

  useEffect(() => {
    fetch('http://localhost:4000/productos')
      .then(res => res.json())
      .then(data => {
        // Agregar ID único si no existe
        const productosConId = data.map((p, i) => ({
          ...p,
          id: p.id || i,
          stock: Number(p.stock),
          cantidad: 0
        }));
        // Ordenar: primero por stock descendente, luego por nombre
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

  // Cambiar cantidad por ID
  const handleCantidadChange = (id, nuevaCantidad) => {
    setProductos(prev => prev.map(p =>
      p.id === id ? { ...p, cantidad: nuevaCantidad } : p
    ));
  };

  // Extraer categorías únicas
  const categorias = Array.from(new Set(productos.map(p => p.categoria))).sort();

  // Filtrar productos según stock y categoría
  const productosFiltrados = productos.filter(p => {
    const cumpleStock = filtroStock === 'Todos' || (filtroStock === 'En Stock' && p.stock > 0);
    const cumpleCategoria = filtroCategoria === 'Todos' || p.categoria === filtroCategoria;
    return cumpleStock && cumpleCategoria;
  });

  const totalPedido = productos.reduce((total, prod) => total + prod.precio * prod.cantidad, 0);

  if (loading) return <div className="App">Cargando productos...</div>;
  if (error) return <div className="App">{error}</div>;

  return (
    <div className="App">
      <h1>Listado de Productos</h1>

      {/* Filtros de stock */}
      <div className="filtros-stock">
        <button onClick={() => setFiltroStock('Todos')} className={filtroStock === 'Todos' ? 'activo' : ''}>Todos</button>
        <button onClick={() => setFiltroStock('En Stock')} className={filtroStock === 'En Stock' ? 'activo' : ''}>En Stock</button>
      </div>

      {/* Filtros de categoría */}
      <div className="filtros-categoria">
        <button onClick={() => setFiltroCategoria('Todos')} className={filtroCategoria === 'Todos' ? 'activo' : ''}>Todos</button>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setFiltroCategoria(cat)}
            className={filtroCategoria === cat ? 'activo' : ''}
          >
            {cat}
          </button>
        ))}
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
