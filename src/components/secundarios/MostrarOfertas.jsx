import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import AgregarOferta from '../terciarios/AgregarOfertas';
import { Link } from 'react-router-dom';

const MostrarOfertas = () => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3009/ofertas')
      .then((response) => {
        setOfertas(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ofertas:', error);
      });
  }, []);

  const ActualizarOfertas = () => {
    axios.get('http://localhost:3009/ofertas')
      .then((response) => {
        setOfertas(response.data);
      });
  };

  const eliminarOferta = async (id) => {
    try {
      await axios.delete(`http://localhost:3009/ofertas/${id}`);
      const updatedOfertas = ofertas.filter(oferta => oferta.id !== id);
      setOfertas(updatedOfertas);
      alert('¡La oferta fue eliminada con éxito!');
    } catch (error) {
      console.error('Error al eliminar la oferta:', error);
    }
  };

  const setOferta = (oferta) => {
    let { id, nombre, descuento, paleta_id, precio, imagen_url } = oferta;
    localStorage.setItem('id', id);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('descuento', descuento);
    localStorage.setItem('paleta_id', paleta_id);
    localStorage.setItem('precio', precio);
    localStorage.setItem('imagen_url', imagen_url);
  };

  return (
    <div className='w-full mx-auto'>
      <div className='max-w-[1240px] mx-auto text-center px-4 md:px-8 mt-16 md:mt-16 lg:mt-16'>
        <p className='md:text-6xl sm:text-4xl text-2xl font-bold text-[#00df9a] mt-24 md:mt-24 lg:mt-24'>
          Nuestras Ofertas
        </p>

        <div className='overflow-x-auto mt-8'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                  Nombre
                </th>
                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                  Descuento
                </th>
                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                  Paleta
                </th>
                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                  Precio
                </th>
                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                  Marca
                </th>
                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {ofertas.map((oferta) => (
                <tr key={oferta.id} className='hover:bg-gray-50'>
                  <td className='px-4 py-3 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0 h-10 w-10'>
                        <img
                          className='h-10 w-10 rounded-full object-cover'
                          src={oferta.imagen_url}
                          alt=''
                        />
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>{oferta.nombre}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-3 whitespace-nowrap'>
                    {oferta.descuento}%
                  </td>
                  <td className='px-4 py-3 whitespace-nowrap'>
                    {oferta.paleta_nombre}
                  </td>
                  <td className='px-4 py-3 whitespace-nowrap'>
                    ${oferta.precio}
                  </td>
                  <td className='px-4 py-3 whitespace-nowrap'>
                    {oferta.marca}
                  </td>
                  <td className='px-4 py-3 whitespace-nowrap text-right text-sm font-medium'>
                    <button onClick={() => eliminarOferta(oferta.id)} className='text-[#00df9a]'>
                      <AiFillDelete className='h-6 w-6' />
                    </button>
                    <Link to='/EditarOfertas' className='ml-2'>
                      <button onClick={() => setOferta(oferta)} className='text-[#00df9a]'>
                        <AiFillEdit className='h-6 w-6' />
                      </button>
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AgregarOferta ActualizarOfertas={ActualizarOfertas}></AgregarOferta>
    </div>
  );
};

export default MostrarOfertas;
