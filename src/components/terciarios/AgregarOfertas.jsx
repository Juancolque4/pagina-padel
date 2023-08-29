import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgregarOferta = ({ ActualizarOfertas }) => {
  const [nombre, setNombre] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [paletaId, setPaletaId] = useState("");
  const [precio, setPrecio] = useState(0);
 
  const [paletas, setPaletas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3009/paletas')
      .then((response) => {
        setPaletas(response.data);
      })
      .catch((error) => {
        console.error('Error fetching paletas:', error);
      });
  }, []);

  const postOferta = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3009/ofertas", {
        nombre,
        descuento,
        paleta_id: paletaId,
        precio,
      });
      alert("¡Se ingresó la oferta con éxito!");
      ActualizarOfertas();
      Limpiar();
    } catch (error) {
      console.error('Error al agregar la oferta:', error);
      alert("No se pudo ingresar la oferta");
    }
  };

  const Limpiar = () => {
    setNombre("");
    setDescuento(0);
    setPaletaId("");
    setPrecio(0);
  };

  return (
    <div className='min-h-screen py-16'>
      <div className='max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-lg border border-gray-200'>
        <div className='flex flex-col items-center justify-start md:items-start md:justify-center'>
          <p className='w-full text-4xl font-bold text-center p-4 text-black mb-10'>Agregar una oferta</p>
          <form className='w-full space-y-6'>
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Nombre
              </p>
              <input
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre de la oferta"
                value={nombre}
                type="text"
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
              />
            </div>
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Descuento (%)
              </p>
              <input
                onChange={(e) => setDescuento(Number(e.target.value))}
                placeholder="Descuento de la oferta"
                value={descuento}
                type="number"
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
              />
            </div>
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Paleta
              </p>
              <select
                onChange={(e) => setPaletaId(e.target.value)}
                value={paletaId}
                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md'
              >
                <option value="">Selecciona una paleta</option>
                {paletas.map((paleta) => (
                  <option key={paleta.id} value={paleta.id}>{paleta.nombre}</option>
                ))}
              </select>
            </div>
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Precio
              </p>
              <input
                onChange={(e) => setPrecio(Number(e.target.value))}
                value={precio}
                type='number'
                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
              />
            </div>
            <div className='relative'>
              <button
                onClick={postOferta}
                className='bg-black text-white w-full inline-block py-3 text-xl font-medium text-center rounded-lg transition duration-200 hover:bg-[#00df9a] ease'
              >
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarOferta;
