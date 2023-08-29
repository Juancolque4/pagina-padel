import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditarPaleta = () => {
    const [id, setId] = useState(null);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [marca, setMarca] = useState("");
    const [categoriaId, setCategoriaId] = useState(null);
    const [stock, setStock] = useState(0);
    const [precio, setPrecio] = useState(0);
    const [imagen_url, setImagen_url] = useState(null);
    const [categorias, setCategorias] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setId(localStorage.getItem('id'));
        setNombre(localStorage.getItem('nombre'));
        setDescripcion(localStorage.getItem('descripcion'));
        setMarca(localStorage.getItem('marca'));
        setCategoriaId(Number(localStorage.getItem('categoria_id')));
        setStock(Number(localStorage.getItem('stock')));
        setPrecio(Number(localStorage.getItem('precio')));
        setImagen_url(localStorage.getItem('imagen_url'));

        axios.get('http://localhost:3009/tipocategoria')
            .then(response => {
                setCategorias(response.data);
            })
            .catch(error => {
                console.error('Error fetching categorias:', error);
            });

    }, []);

    const actualizar = async (e) => {
        e.preventDefault();
        console.log(categoriaId)
        const response = await axios.put(`http://localhost:3009/paletasMod/${id}`, {
            nombre,
            descripcion,
            marca,
            tipo_categoria_id: categoriaId,
            stock,
            precio,
            imagen_url
        });
        console.log(response.status);
        if (response.status === 200) {
            alert("Su paleta fue modificada con éxito");
            navigate("/MostrarPaletas");
        } else {
            alert("No se pudo modificar la paleta");
        }
    };


    return (
        <div className='min-h-screen py-16'>
            <div className='max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-lg border border-gray-200'>
                <div className='flex flex-col items-center justify-start md:items-start md:justify-center'>
                    <p className='w-full text-4xl font-bold text-center p-4 text-black mb-10'>Editar paleta</p>
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
                            <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>Descripción</p>
                            <input
                                onChange={(e) => setDescripcion(e.target.value)}
                                value={descripcion}
                                type='text'
                                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='relative'>
                            <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>Marca</p>
                            <input
                                onChange={(e) => setMarca(e.target.value)}
                                value={marca}
                                type='text'
                                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='relative'>
                            <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>Categoría</p>
                            <select
                                onChange={(e) => setCategoriaId(Number(e.target.value))}
                                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
                            >
                                <option value={categoriaId} disabled>Seleccionar categoría</option>
                                {categorias.map(categoria => (
                                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className='relative'>
                            <p className='bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute'>Stock</p>
                            <input
                                onChange={(e) => setStock(Number(e.target.value))}
                                value={stock}
                                type='number'
                                className='border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md'
                            />
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
                                onChange={(e) => setImagen_url(e.target.value)}
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
                        <Link to={"/MostrarPaletas"}>
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

export default EditarPaleta;
