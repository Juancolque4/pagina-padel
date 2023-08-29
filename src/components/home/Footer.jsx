import React from 'react'
import {FaDribbbleSquare,FaFacebookSquare,FaInstagram,FaTwitterSquare} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 grid lg:grid-cols-2 gap-8 text-gray-300 px-4'>
        <div >
            <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Redes sociales</h1>
            <p className='py-4'>Síguenos en Facebook, Twitter e Instagram para mantenerte al día con las novedades, 
            consejos y mucha pasión por el pádel. ¡Bienvenidos a la familia PadelStore! 🚀🏓 #PadelStore #PasiónPorElPádel</p>
            <div className='flex justify-between md:w-[75%] my-6 '>
                <FaDribbbleSquare size={30}/>
                <FaFacebookSquare size={30}/>
                <FaInstagram size={30}/>
                <FaTwitterSquare size={30}/>
            </div>
        </div>
    </div>
  )
}

export default Footer