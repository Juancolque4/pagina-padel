import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ paleta, agregarAlCarrito, dolarBlue }) => {
    const { id, imagen_url, nombre, marca, tipo_nombre, precio, stock } = paleta;

    const precioAjustado = (precio * dolarBlue).toFixed(2);
    const precioFormateado = parseFloat(precioAjustado).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const agregarAlCarritoHandler = () => {
        if (stock === 0) {
            alert('No hay suficiente stock disponible.');
            return;
        } else {
            alert("Se agrego al carrito")
            agregarAlCarrito(paleta);
        }

    };

    return (
        <>
            <div className='bg-white p-4 shadow-md rounded-md transition-transform transform hover:scale-105 cursor-pointer'>
                <Link to={`/paletas/${id}`} key={id} className="hover:no-underline">
                    <div className='relative'>
                        <img
                            src={imagen_url}
                            alt={`Paleta ${nombre}`}
                            className='w-full h-70 object-cover'
                        />
                    </div>
                </Link>
                <h2 className='text-lg font-semibold mt-2'>{nombre}</h2>
                <p className='text-sm font-semibold mt-1'>{marca}</p>
                <p className='text-sm font-semibold mt-1'>{tipo_nombre}</p>
                <div className='mt-auto'>
                    <div className='flex items-center justify-between'>
                        <span className='text-[#00df9a] font-semibold'>{precioFormateado}</span>
                        <button
                            className={`bg-[#00df9a] text-white px-3 py-1 rounded-md hover:bg-[#00a177] transition-colors ${stock === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={agregarAlCarritoHandler}
                            disabled={stock === 0}
                        >
                            {stock === 0 ? 'Sin Stock' : 'Comprar'}
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Card;
