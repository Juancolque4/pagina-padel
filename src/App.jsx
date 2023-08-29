import React, { useState } from "react";
import { RiMenu3Fill, RiUser3Line, RiAddLine, RiCloseLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom"; 
import Home from "./components/principales/Home";
import Paletas from "./components/principales/Paletas";
import NavBar from "./components/compartidos/NavBar";
import Header from "./components/home/Header";
import Carrito from "./components/compartidos/Carrito";
import Configuracion from "./components/principales/Configuracion";
import MostrarPaletas from "./components/secundarios/MostrarPaletas";
import EditarPaleta from "./components/terciarios/EditarPaleta";
import ProductosDetalles from "./components/compartidos/ProductosDetalles";
import MostrarOfertas from "./components/secundarios/MostrarOfertas";
import EditarOfertas from "./components/terciarios/EditarOfertas";
import Contactos from "./components/principales/Contactos";

function App() {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
    setMostrarCarrito(false);
  };

  const toggleOrders = () => {
    setMostrarCarrito(!mostrarCarrito);
    setMostrarMenu(false);
  };

  return (
    <>
      <BrowserRouter>
        <NavBar mostrarMenu={mostrarMenu} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="Paletas" element={<Paletas />} />
          <Route path="Contactos" element={<Contactos />} />
          <Route path="Configuracion" element={<Configuracion />} />
          <Route path="MostrarPaletas" element={<MostrarPaletas />} />
          <Route path="EditarPaleta" element={<EditarPaleta />} />
          <Route path="MostrarOfertas" element={<MostrarOfertas />} />
          <Route path="EditarOfertas" element={<EditarOfertas />} />
          <Route path="/paletas/:paletaId" element={<ProductosDetalles />} />
        </Routes>
      </BrowserRouter>
      <Header toggleCart={() => setMostrarCarrito(!mostrarCarrito)} />
      <Outlet /> 
      
      <div className="">
        <nav className="bg-[#1F1D2B] lg:hidden fixed w-full bottom-0 left-0 text-3xl text-gray-400 py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
          <button className="p-2">
            <RiUser3Line />
          </button>
          <button className="p-2">
            <RiAddLine />
          </button>
          <button onClick={toggleOrders} className="p-2">
            <FiShoppingCart />
          </button>
          <button onClick={toggleMenu} className="text-white p-2">
            {mostrarMenu ? <RiCloseLine /> : <RiMenu3Fill />}
          </button>
        </nav>
      </div>

      {/* Renderizar el carrito de forma condicional */}
      {mostrarCarrito && (
        <div className="fixed top-0 right-0 w-full h-full bg-[rgba(0,0,0,0.5)]">
          <Carrito showCart={mostrarCarrito} setShowCart={setMostrarCarrito} />
        </div>
      )}
    </>
  );
}

export default App;
