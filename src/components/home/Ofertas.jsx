import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ofertas = () => {
    const [products, setProducts] = useState([]);
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [dolarBlue, setDolarBlue] = useState(1);

    useEffect(() => {
        ObtenerOfertas();
        obtenerDolarBlue();
    }, []);

    const ObtenerOfertas = async () => {
        axios.get('http://localhost:3009/ofertas')
            .then(response => {
                const data = response.data;
                setProducts(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
            })
            .catch(error => {
                console.error('Error al obtener las ofertas:', error);
            });
    };
    
    const obtenerDolarBlue = async () => {
        try {
            const response = await axios.get('http://localhost:3009/dolar_blue');
            const valorDolarBlue = response.data.valor;
            setDolarBlue(valorDolarBlue);
        } catch (error) {
            console.error('Error al obtener el valor del dólar blue:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);


    const formatPrecioOfertas = (precio) => {
        return parseFloat(precio * dolarBlue).toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const calcularPrecioConDescuento = (precio, descuento) => {
        const precioConDescuento = precio * (1 - descuento / 100);
        return parseFloat(precioConDescuento * dolarBlue).toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <>
            <div className='container mx-auto py-8'>
                <h1 className='text-white text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-6'>Ofertas</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {visibleProducts.map(product => (
                        <div
                            key={product.id}
                            className='bg-white p-4 shadow-md rounded-md transition-transform transform hover:scale-105 cursor-pointer'
                        >
                            <Link to={`/paletas/${product.paleta_id}`} key={product.id}>
                                <div className='relative'>
                                    <img
                                        src={product.imagen_url}
                                        alt={`Producto ${product.nombre}`}
                                        className='w-full h-50 object-cover'
                                    />
                                    <div className='absolute bottom-0 left-0 bg-red-500 text-white p-2 rounded-tl-md'>
                                        {product.descuento}% off
                                    </div>
                                </div>
                            </Link>
                            <h2 className='text-lg font-semibold mt-2'>{product.paleta_nombre}</h2>
                            <p className='text-sm font-semibold mt-1'>{product.marca}</p>
                            <div className='flex items-center mt-2'>
                                <span className='text-gray-500 line-through mr-2'>
                                    {formatPrecioOfertas(product.precio)}
                                </span>
                                <span className='text-[#00df9a] font-semibold'>
                                    ${calcularPrecioConDescuento(product.precio, product.descuento)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex justify-center mt-4'>
                    <button
                        onClick={handlePrevPage}
                        className={`${currentPage === 1 ? 'hidden' : 'block'
                            } mr-2 px-4 py-2 bg-[#00df9a] text-white rounded-md focus:outline-none`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNextPage}
                        className={`${currentPage === totalPages ? 'hidden' : 'block'
                            } px-4 py-2 bg-[#00df9a] text-white rounded-md focus:outline-none`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </>
    );
};

export default Ofertas;
