import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Ofertas from '../home/Ofertas';
import Footer from '../home/Footer';


const ProductosDetalles = ({ fromOfertas }) => {
    const { paletaId } = useParams();
    const [paleta, setPaleta] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [stockOriginal, setStockOriginal] = useState(0);
    const [dolarBlue, setDolarBlue] = useState(1);

    useEffect(() => {
        obtenerDatosPaleta();
        obtenerDolarBlue();
    }, [paletaId]);

    useEffect(() => {
        if (paleta) {
            setStockOriginal(paleta.stock);
        }
    }, [paleta]);

    const obtenerDolarBlue = async () => {
        try {
            const response = await axios.get('http://localhost:3009/dolar_blue');
            const valorDolarBlue = response.data.valor;
            setDolarBlue(valorDolarBlue);
        } catch (error) {
            console.error('Error al obtener el valor del dólar blue:', error);
        }
    };
    const obtenerDatosPaleta = () => {
        axios
            .get(`http://localhost:3009/paletas/${paletaId}`)
            .then(response => {
                const data = response.data;
                setPaleta(data);
                setStockOriginal(data.stock);
            })
            .catch(error => {
                console.error('Error al obtener los detalles de la paleta:', error);
            });
    };

    
    const formatPrecioDetalle = (precio) => {
        return parseFloat(precio * dolarBlue).toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };


    const agregarAlCarritoHandler = async () => {
        const nuevoStock = stockOriginal - cantidad;

        if (nuevoStock < 0) {
            alert('No hay suficiente stock disponible.');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3009/items_carrito/${paleta.id}`);
            const itemEnCarrito = response.data;

            if (itemEnCarrito) {
                const nuevaCantidad = itemEnCarrito.cantidad + cantidad;
                await axios.put(`http://localhost:3009/items_carrito/${paleta.id}`, {
                    cantidad: nuevaCantidad
                });
            } else {
                await axios.post('http://localhost:3009/items_carrito', {
                    producto_id: paleta.id,
                    cantidad: cantidad
                });
            }

            await axios.put(`http://localhost:3009/paletas/${paleta.id}`, {
                stock: nuevoStock
            });

            await obtenerDatosPaleta();

            alert(`Se agregaron ${cantidad} unidades al carrito`);
        } catch (error) {
            console.error('Error al agregar o actualizar el producto en el carrito en la base de datos:', error);
        }
    };

    if (!paleta) {
        return <div>Cargando detalles...</div>;
    }

    return (
        <>
        <div className='max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8'>
            <div className='md:order-2'>
                <img className='w-full mx-auto my-4 md:my-16' src={paleta.imagen_url} alt='Paleta' />
            </div>
            <div className='md:order-1 flex flex-col justify-start text-white mt-16'>
                <div className='page-header pt-4'>
                    {/* Migas de pan */}
                    <div className='breadcrumbs'>
                        <a href='/'>Inicio</a>
                        <span className='separator'>.</span>
                        <a href='/paletas'>Paletas</a>
                        <span className='separator'>.</span>
                        <span className='crumb active'>{paleta.nombre}</span>
                    </div>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold mt-2'>{paleta.nombre}</h1>
                </div>

                <div className='price-container mb-3'>
                    <span className='text-[#00df9a] font-semibold'>${formatPrecioDetalle(paleta.precio)}</span>
                    <div className='mt-1'>
                        <span className='font-semibold'>3 Cuotas sin interes de: ${paleta.precio / 3}</span>
                    </div>
                </div>

                <div className='form-row mt-5 '>
                    <div className='w-full md:w-1/2'>
                        <div className='form-group flex items-center'>
                            <input
                                type='number'
                                className='form-control w-full text-black rounded-md font-medium px-3 py-2'
                                min='1'
                                value={cantidad} 
                                onChange={(e) => setCantidad(parseInt(e.target.value))}
                            />
                            <button
                                className='bg-[#00df9a] text-black rounded-md font-medium px-4 py-2 ml-2'
                                onClick={agregarAlCarritoHandler}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>

                </div>
                <div className="mt-10">
                    <h3 className="font-bold text-xl mb-2"><b>DESCRIPCIÓN DE LA PALETA</b></h3>
                    <dl className="data-sheet flex flex-wrap items-stretch mb-4">
                        <dd className="value flex-1 bg-gray-200 p-4 mr-4 mb-2" style={{ color: '#232323', fontSize: '15px' }}>
                            <p className="mb-2">
                                Nuestra {paleta.nombre}
                                <strong className="font-bold"> es perfecta para un juego de potencia.</strong>
                            </p>
                            <p className="mb-2">
                                {paleta.descripcion}
                            </p>
                        </dd>
                    </dl>
                </div>
            </div>            
        </div>
        <Ofertas/>
        <Footer/>
        </>
    );
};

export default ProductosDetalles;
