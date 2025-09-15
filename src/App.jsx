import { useState } from 'react';
import './styles/App.css';
import productosData from './data/productos';
import Producto from './components/Producto';

function App() {
  const [cantidades, setCantidades] = useState(productosData.map(() => 0));

  const actualizarCantidad = (index, nuevaCantidad) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = nuevaCantidad;
    setCantidades(nuevasCantidades);
  };

  const totalSeleccionado = cantidades.reduce((acc, cant) => acc + cant, 0);
  const totalPrecio = cantidades.reduce((acc, cant, i) => acc + cant * productosData[i].precio, 0);

  return (
    <div className="App">
      <h1>Listado de Productos</h1>
      <div className="encabezado">
        <span>Producto</span>
        <span>Precio</span>
        <span>Stock</span>
        <span>Cant.</span>
      </div>

      {productosData.map((producto, index) => (
        <Producto
          key={index}
          index={index}
          nombre={producto.nombre}
          precio={producto.precio}
          stock={producto.stock}
          cantidad={cantidades[index]}
          onCantidadChange={actualizarCantidad}
        />
      ))}

      <div className="total-general">
        <h2>Total seleccionado: {totalSeleccionado}</h2>
        <h2>Total precio: {totalPrecio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h2>
      </div>
    </div>
  );
}

export default App;
