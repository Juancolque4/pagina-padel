import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditarOfertas = () => {
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState("");
    const [descuento, setDescuento] = useState(0);
    const [paletaId, setPaletaId] = useState("");
    const [precio, setPrecio] = useState(0);
    const [imagen_url, setImagenUrl] = useState("");
    const [paletas, setPaletas] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        setId(localStorage.getItem('id'));
        setNombre(localStorage.getItem('nombre'));
        setDescuento(Number(localStorage.getItem('descuento')));
        setPaletaId(localStorage.getItem('paleta_id'));
        setPrecio(Number(localStorage.getItem('precio')));
        setImagenUrl(localStorage.getItem('imagen_url'));

        axios.get('http://localhost:3009/paletas')
            .then(response => {
                setPaletas(response.data);
            })
            .catch(error => {
                console.error('Error fetching paletas:', error);
            });
    }, []);

    const actualizar = async (e) => {
        e.preventDefault();
        const response = await axios.put(`http://localhost:3009/ofertas/${id}`, {
            nombre,
            descuento,
            paleta_id: paletaId,
            precio,
            imagen_url
        });
        if (response.status === 200) {
            alert("La oferta fue modificada con éxito");
            navigate("/MostrarOfertas");
        } else {
            alert("No se pudo modificar la oferta");
        }
    };

    return (
        <div className='min-h-screen py-16'>
            <div className='max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-lg border border-gray-200'>
                <div className='flex flex-col items-center justify-start md:items-start md:justify-center'>
                    <p className='w-full text-4xl font-bold text-center p-4 text-black mb-10'>Editar oferta</p>
                    <form className='w-full space-y-6'>
                        <div className='relative'>
                            <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>Nombre</p>
                            <input
                                onChange={(e) => setNombre(e.target.value)}
                                value={nombre}
                                type='text'
                                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='relative'>
                            <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>Descuento (%)</p>
                            <input
                                onChange={(e) => setDescuento(Number(e.target.value))}
                                value={descuento}
                                type='number'
                                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='relative'>
                            <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 font-medium text-gray-600'>Paleta</p>
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
                        <div className='relative'>
                            <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>Precio</p>
                            <input
                                onChange={(e) => setPrecio(Number(e.target.value))}
                                value={precio}
                                type='number'
                                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='relative'>
                            <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>Imagen URL</p>
                            <input
                                onChange={(e) => setImagenUrl(e.target.value)}
                                value={imagen_url}
                                type='text'
                                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='relative'>
                            <button
                                onClick={actualizar}
                                className='bg-black text-white w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center rounded-lg transition duration-200 hover:bg-[#00df9a] ease'
                            >
                                Actualizar
                            </button>
                        </div>
                        <Link to={"/MostrarOfertas"}>
                            <button className='bg-black w-[100px] text-[#00df9a] rounded-md font-medium my-6 mx-auto px-6 py-1'>
                                Volver
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarOfertas;
