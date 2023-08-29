import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';

const Contactos = () => {
    return (
        <div className='bg-gray-100 py-16 mt-64'>
            <div className='max-w-4xl mx-auto px-4 md:px-8'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#00df9a] text-center'>
                    ¡Conéctate con nosotros!
                </h1>
                <p className='text-lg text-gray-700 text-center mb-10'>
                    Estamos aquí para ayudarte. Encuéntranos en nuestras redes sociales o contáctanos directamente.
                </p>
                <div className='flex justify-center items-center space-x-6'>
                    <a
                        href='https://www.instagram.com'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[#E1306C] hover:text-[#FFC045] transition duration-300'
                    >
                        <FaInstagram className='text-4xl' />
                    </a>
                    <a
                        href='https://www.facebook.com'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[#1877F2] hover:text-[#FFC045] transition duration-300'
                    >
                        <FaFacebook className='text-4xl' />
                    </a>
                    <a
                        href='https://twitter.com'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[#1DA1F2] hover:text-[#FFC045] transition duration-300'
                    >
                        <FaTwitter className='text-4xl' />
                    </a>
                    <a
                        href='https://wa.me/1234567890' 
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-[#25D366] hover:text-[#FFC045] transition duration-300'
                    >
                        <FiPhone className='text-4xl' />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contactos;
