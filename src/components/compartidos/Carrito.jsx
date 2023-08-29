import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiCloseLine, RiDeleteBin6Line } from 'react-icons/ri';

const Carrito = (props) => {
  const { showCart, setShowCart } = props;
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [dolarBlue, setDolarBlue] = useState(1);

  useEffect(() => {
    obtenerItemsCarrito();
    obtenerDolarBlue();
  }, []);

  const obtenerDolarBlue = async () => {
    try {
        const response = await axios.get('http://localhost:3009/dolar_blue');
        const valorDolarBlue = response.data.valor;
        setDolarBlue(valorDolarBlue);
    } catch (error) {
        console.error('Error al obtener el valor del dólar blue:', error);
    }
};
  const obtenerItemsCarrito = () => {
    axios.get('http://localhost:3009/items_carrito')
      .then(response => {
        setItemsCarrito(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los items del carrito:', error);
      });
  };

  const eliminarProducto = async (producto) => {
    try {
    
      await axios.delete(`http://localhost:3009/items_carrito/${producto.id}`);
   
      
      const updatedStock = producto.stock + producto.cantidad;

        await axios.put(`http://localhost:3009/paletas/${producto.producto_id}`, {
        stock: updatedStock
      });
      console.log("Actualización de stock exitosa");

      obtenerItemsCarrito();
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const formatPrecioCarrito = (precio) => {
    return parseFloat(precio * dolarBlue).toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calcularTotal = () => {
    return itemsCarrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <div className={`lg:col-span-2 fixed top-0 bg-[#1F1D2B] w-full lg:w-96 lg:right-0 h-full transition-all z-50 ${showCart ? "right-0" : "-right-full"}`}>
      <div className="relative pt-16 lg:pt-8 text-gray-300 p-4 h-full">
        <RiCloseLine
          onClick={() => setShowCart(false)}
          className="lg:hidden absolute right-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl cursor-pointer"
        />
        <RiCloseLine
          onClick={() => setShowCart(false)}
          className="hidden lg:block absolute right-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl cursor-pointer"
        />
        <h1 className="text-2xl my-4">Carrito de Compras</h1>
        <div>
          <div className="grid grid-cols-7 mb-4 p-4">
           
            <h5 className="col-span-3">Nombre</h5>
            <h5 className="col-span-2">Cantidad</h5>
            <h5 className="col-span-1">Precio</h5>
            
          </div>

          <div className="h-[400px] md:h-[700px] lg:h-[310px] overflow-scroll">
            {itemsCarrito.map(item => (
              <div className="bg-[#262837] p-4 rounded-xl mb-4 mr-2" key={item.id}>
                <div className="grid grid-cols-7 mb-4">
                  <div className="col-span-4 flex items-center gap-3">
                    <div>
                      <h5 className="text-sm">{item.nombre_paleta}</h5>
                    </div>
                  </div>
                  <div>
                    <span>{item.cantidad}</span>
                  </div>
                  <div>
                  <span>{formatPrecioCarrito(item.precio)}</span>
                  </div>
                  <div className="col-span-2 mt-3 -mb-5 ml-28">
                    <button
                      className="border border-red-500 p-2 rounded-lg ml-4"
                      onClick={() => eliminarProducto(item)}
                    >
                      <RiDeleteBin6Line className="text-red-500" />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#262837] absolute w-full bottom-0 left-0 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Descuento</span>
            <span>$0</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-400">Subtotal</span>
            <span>${formatPrecioCarrito(calcularTotal())}</span>
          </div>
          <div>
            <button className="bg-[#ec7c6a] w-full py-2 px-4 rounded-lg">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
