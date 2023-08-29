import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../compartidos/Card';
import { RiSearch2Line } from 'react-icons/ri';
import Carrito from '../compartidos/Carrito';

const Paletas = () => {
    const [paletas, setPaletas] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
    const [busqueda, setBusqueda] = useState('');
    const [carrito, setCarrito] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [dolarBlue, setDolarBlue] = useState(1);

    useEffect(() => {
        obtenerPaletas();
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

    const obtenerPaletas = () => {
        axios.get('http://localhost:3009/paletas')
            .then(response => {
                const data = response.data;
                setPaletas(data);
            })
            .catch(error => {
                console.error('Error al obtener las paletas:', error);
            });
    };
    const paletasFiltradas = paletas.filter(paleta =>
        (categoriaSeleccionada === 'Todas' || paleta.tipo_nombre === categoriaSeleccionada) &&
        paleta.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleFiltrar = (categoria) => {
        setCategoriaSeleccionada(categoria);
    };

    const handleBusqueda = (event) => {
        setBusqueda(event.target.value);
    };

    const agregarAlCarrito = async (paleta) => {
        const paletaEnCarrito = carrito.find(item => item.producto_id === paleta.id);

        if (paletaEnCarrito) {
            const nuevoCarrito = carrito.map(item =>
                item.producto_id === paleta.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            );

            const nuevoStock = paleta.stock - 1;

            try {
                await Promise.all([
                    axios.put(`http://localhost:3009/items_carrito/${paletaEnCarrito.producto_id}`, {
                        cantidad: paletaEnCarrito.cantidad + 1
                    }),
                    axios.put(`http://localhost:3009/paletas/${paleta.id}`, {
                        stock: nuevoStock
                    })
                ]);

                setCarrito(nuevoCarrito);
                obtenerPaletas(); 
                obtenerItemsCarrito();
            } catch (error) {
                console.error('Error al actualizar la cantidad en la base de datos:', error);
            }
        } else {
            const nuevoStock = paleta.stock - 1;

            try {
                await Promise.all([
                    axios.post('http://localhost:3009/items_carrito', {
                        producto_id: paleta.id,
                        cantidad: 1
                    }),
                    axios.put(`http://localhost:3009/paletas/${paleta.id}`, {
                        stock: nuevoStock
                    })
                ]);

                setCarrito([...carrito, { producto_id: paleta.id, cantidad: 1 }]);
                obtenerPaletas(); 
                obtenerItemsCarrito(); 
            } catch (error) {
                console.error('Error al agregar el producto al carrito en la base de datos:', error);
            }
        }
    };

    const obtenerItemsCarrito = () => {
        axios.get('http://localhost:3009/items_carrito')
            .then(response => {
                setCarrito(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los items del carrito:', error);
            });
    };

    return (
        <>
            <main className="lg:pl-2 lg:pr-5 pb-20 mt-16 md:mt-16 lg:mt-16">
                <div className="md:p-8 p-4">
                    <header>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 mt-5 md:mt-1 lg:mt-2">
                            <div>
                                <h1 className="text-white text-lg">Nuestras paletas</h1>
                            </div>
                            <form>
                                <div className="w-full relative">
                                    <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input
                                        type="text"
                                        className="bg-[#1F1D2B] w-full py-2 pl-10 pr-4 rounded-lg text-gray-300 outline-none"
                                        placeholder="Buscar..."
                                        value={busqueda}
                                        onChange={handleBusqueda}
                                    />
                                </div>
                            </form>
                        </div>
                        <nav className="text-gray-300 flex items-center justify-between md:justify-start md:gap-8 border-b mb-6">
                            <button
                                onClick={() => handleFiltrar('Todas')}
                                className={`relative py-2 pr-4 ${categoriaSeleccionada === 'Todas' ? 'text-[#00df9a] before:w-1/2 before:h-[2px] before:absolute before:bg-[#00df9a] before:left-0 before:rounded-full before:-bottom-[1px]' : 'text-gray-300'
                                    }`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => handleFiltrar('Importadas')}
                                className={`py-2 pr-4 ${categoriaSeleccionada === 'Importadas' ? 'text-[#00df9a]' : 'text-gray-300'
                                    }`}
                            >
                                Importadas
                            </button>
                            <button
                                onClick={() => handleFiltrar('Nacionales')}
                                className={`py-2 pr-4 ${categoriaSeleccionada === 'Nacionales' ? 'text-[#00df9a]' : 'text-gray-300'
                                    }`}
                            >
                                Nacionales
                            </button>
                        </nav>
                    </header>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                        {paletasFiltradas.map(paleta => (
                            <Card
                                key={paleta.id}
                                paleta={paleta}
                                agregarAlCarrito={agregarAlCarrito}
                                dolarBlue={dolarBlue} 
                            />
                        ))}
                    </div>

                </div>
            </main>
            {/* Renderizar el carrito de forma condicional */}
            {showCart && (
                <div className="fixed top-0 right-0 w-full h-full bg-[rgba(0,0,0,0.5)]">
                    <Carrito
                        carrito={carrito}
                        setCarrito={setCarrito}
                        showCart={showCart}
                        setShowCart={setShowCart}
                        dolarBlue={dolarBlue}
                    />
                </div>
            )}
        </>
    );
};

export default Paletas;
