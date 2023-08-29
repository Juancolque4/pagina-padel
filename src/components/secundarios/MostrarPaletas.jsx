import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AgregarPaleta from '../terciarios/AgregarPaleta';

const MostrarPaletas = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3009/paletas')
            .then((response) => {
                setList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching paletas:', error);
            });
    }, []);

    const ActualizarPaletas = () => {
        axios.get('http://localhost:3009/paletas')
            .then((response) => {
                setList(response.data);
            });
    };

    const eliminarPaleta = async (id) => {
        axios.delete(`http://localhost:3009/paletas/${id}`)
            .then(() => {
                ActualizarPaletas();
                alert('¡Su paleta fue eliminada con éxito!');
            });
    };

    

    const setPaleta = (paleta) => {
        let { id, nombre, descripcion, marca, tipo_categoria_id, stock, precio, imagen_url } = paleta;
        localStorage.setItem('id', id);
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('descripcion', descripcion);
        localStorage.setItem('marca', marca);
        localStorage.setItem('tipo_categoria_id', tipo_categoria_id);
        localStorage.setItem('stock', stock);
        localStorage.setItem('precio', precio);
        localStorage.setItem('imagen_url', imagen_url);
    };
   
    const formatPrecioList = (precio) => {
        return parseFloat(precio).toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };
    return (
        <div className='w-full mx-auto'>
            <div className='max-w-[1240px] mx-auto text-center px-4 md:px-8 mt-16 md:mt-16 lg:mt-16'>
                <p className='md:text-6xl sm:text-4xl text-2xl font-bold text-[#00df9a] mt-24 md:mt-24 lg:mt-24'>
                    Nuestras Paletas
                </p>

                <div className='overflow-x-auto mt-8'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                                    Nombre
                                </th>
                                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                                    Marca
                                </th>
                                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                                    Categoría
                                </th>
                                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                                    Stock
                                </th>
                                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                                    Precio
                                </th>
                                <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-900'>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {list.map((paleta) => (
                                <tr key={paleta.id} className='hover:bg-gray-50'>
                                    <td className='px-4 py-3 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className='flex-shrink-0 h-10 w-10'>
                                                <img
                                                    className='h-10 w-10 rounded-full object-cover'
                                                    src={paleta.imagen_url}
                                                    alt=''
                                                />
                                            </div>
                                            <div className='ml-4'>
                                                <div className='text-sm font-medium text-gray-900'>{paleta.nombre}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-4 py-3 whitespace-nowrap'>
                                        <span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
                                            {paleta.marca}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3 whitespace-nowrap'>{paleta.tipo_nombre}</td>
                                    <td className='px-4 py-3 whitespace-nowrap'>{paleta.stock}</td>
                                    <td className='px-4 py-3 whitespace-nowrap'>{formatPrecioList(paleta.precio)}</td>
                                    <td className='px-4 py-3 whitespace-nowrap text-right text-sm font-medium'>
                                        <button onClick={() => eliminarPaleta(paleta.id)} className='text-[#00df9a]'>
                                            <AiFillDelete className='h-6 w-6' />
                                        </button>
                                        <Link to='/EditarPaleta' className='ml-2'>
                                            <button onClick={() => setPaleta(paleta)} className='text-[#00df9a]'>
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
            <AgregarPaleta ActualizarPaletas={ActualizarPaletas} />
        </div>
    );
};

export default MostrarPaletas;

