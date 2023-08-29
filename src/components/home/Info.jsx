import React from 'react';
import { FaTruck, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

const Info = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div className="text-2xl font-semibold mb-4">Envíos Gratis</div>
          <div className="text-gray-500 text-sm mb-4">En compras superiores a 20 mil</div>
          <div className="flex justify-center">
            <FaTruck className="text-gray-800 text-4xl" />
          </div>
        </div>

        <div className="bg-[#00df9a] p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div className="text-2xl font-semibold mb-4">6 Cuotas sin Interés</div>
          <div className="text-gray-500 text-sm mb-4">Tarjetas bancarias</div>
          <div className="flex justify-center">
            <FaCreditCard className="text-gray-800 text-4xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
          <div className="text-2xl font-semibold mb-4">10% Extra Off</div>
          <div className="text-gray-500 text-sm mb-4">Acumulable con otros descuentos</div>
          <div className="flex justify-center">
            <FaMoneyBillWave className="text-gray-800 text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
