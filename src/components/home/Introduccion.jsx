import React from 'react'
import Typed from 'react-typed';
import { Link } from 'react-router-dom';
const Introduccion = () => {
  return (
    <>
    <div className='text-white flex flex-col justify-center items-center h-screen -mb-12 md:-mb-12 lg:-mb-12'>
      <p className='text-[#00df9a] font-bold p-2 md:text-6xl sm:text-5xl text-4xl'>
        PADELSTORE
      </p>
      <h1 className='md:text-5xl sm:text-4xl text-2xl font-bold md:py-6'>
        Encuentra tu paleta favorita
      </h1>
      <div className='flex justify-center items-center'>
        <p className='text-gray-500 md:text-5x3 sm:text-4xl text-xl font-bold py-4'>
          Todas las marcas que busques:
        </p>
        <Typed
          className='text-[#00df9a] md:text-5x3 sm:text-4xl text-xl font-bold pl-2'
          strings={['Nox', 'Head', 'BullPadel', 'Siux', 'Babollat', 'Addidas']}
          typeSpeed={120}
          backSpeed={140}
          loop
        />
      </div>
      <Link to="/Paletas">
        <button className='bg-[#00df9a] text-black w-[200px] rounded-md font-medium my-6 px-6 py-3 '>
          Paletas
        </button>
      </Link>
    </div>
    
    </>
  );
};

export default Introduccion