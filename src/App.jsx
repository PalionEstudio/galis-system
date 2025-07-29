import './styles/App.css';
import productos from './data/productos';
import Producto from './components/Producto';

function App() {
  return (
    <div className="App">
      <h1>Listado de Productos</h1>
      <div className="encabezado">
        <span className="col-nombre">Producto</span>
        <span className="col-precio">Precio</span>
        <span className="col-stock">Stock</span>
      </div>

      {productos.map((producto, index) => (
        <Producto
          key={index}
          nombre={producto.nombre}
          precio={producto.precio}
          stock={producto.stock}
        />
      ))}
    </div>
  );
}

export default App;
