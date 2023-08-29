import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgregarPaleta = ({ ActualizarPaletas }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [marca, setMarca] = useState("");
  const [tipo_categoria_id, setTipoCategoriaId] = useState("");
  const [stock, setStock] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [imagen_url, setImagen_url] = useState("");
  const [tiposCategoria, setTiposCategoria] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3009/tipocategoria')
      .then((response) => {
        setTiposCategoria(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tipos de categoria:', error);
      });
  }, []);

  const postPaleta = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3009/paletas", {
      nombre,
      descripcion,
      marca,
      tipo_categoria_id,
      stock,
      precio,
      imagen_url
    });
    if (response.status === 200) {
      alert("¡Se ingresó la paleta con éxito!");
      ActualizarPaletas();
      Limpiar();
    } else {
      alert("No se pudo ingresar la paleta");
    }
  };

  const Limpiar = () => {
    setNombre("");
    setDescripcion("");
    setMarca("");
    setTipoCategoriaId("");
    setStock(0);
    setPrecio(0);
    setImagen_url("");
  };

  return (
    <div className='min-h-screen py-16'>
      <div className='max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-lg border border-gray-200'>
        <div className='flex flex-col items-center justify-start md:items-start md:justify-center'>
          <p className='w-full text-4xl font-bold text-center p-4 text-black mb-10'>Agregar una paleta</p>
          <form className='w-full space-y-6'>
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Nombre
              </p>
              <input
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre de la paleta"
                value={nombre}
                type="text"
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
              />
            </div>
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Descripción
              </p>
              <input
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción de la paleta"
                value={descripcion}
                type="text"
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
              />
            </div>
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Marca
              </p>
              <input
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Marca de la paleta"
                value={marca}
                type="text"
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
              />
            </div>
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Categoría
              </p>
              <select
                onChange={(e) => setTipoCategoriaId(e.target.value)}
                value={tipo_categoria_id}
                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md'
              >
                <option value="">Selecciona una categoría</option>
                {tiposCategoria.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Stock
              </p>
              <input
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock de la paleta"
                value={stock}
                type="number"
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
              />
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
            <div className='w-full relative'>
              <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>
                Imagen
              </p>
              <input
                onChange={(e) => setImagen_url(e.target.value)}
                placeholder="Imagen de la paleta"
                value={imagen_url}
                type="text"
                className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md"
              />
            </div>
            <div className='relative'>
              <button
                onClick={postPaleta}
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

export default AgregarPaleta;
