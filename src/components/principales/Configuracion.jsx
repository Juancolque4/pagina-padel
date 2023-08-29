import React from 'react';
import { Link } from 'react-router-dom';


const Configuracion = () => {
    return (
        <div className="relative py-16 bg-gradient-to-br  to-gray-200 mt-11">
            <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                    <div className="rounded-xl bg-white shadow-xl">
                        <div className="p-6 sm:p-16">
                            <div className="space-y-4 text-center">
                                <h2 className="mb-8 text-2xl text-gray-500 font-bold">Configuracion</h2>
                            </div>
                            <div className="mt-14 grid space-y-4">
                                <Link to="/MostrarPaletas">
                                    <div className=" grid space-y-4">
                                        <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-[#00df9a] focus:bg-blue-50 active:bg-blue-100">
                                            <div className="relative flex items-center space-x-4 justify-center">
                                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-[#00df9a] sm:text-base">Paletas</span>
                                            </div>
                                        </button>
                                    </div>
                                </Link>

                                <Link to="/MostrarOfertas">
                                    <div className=" grid space-y-4">
                                        <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-[#00df9a] focus:bg-blue-50 active:bg-blue-100">
                                            <div className="relative flex items-center space-x-4 justify-center">
                                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-[#00df9a] sm:text-base">Ofertas</span>
                                            </div>
                                        </button>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuracion;
