import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

const Header = ({ toggleCart }) => { 
  return (
    <header className="bg-[#1F1D2B] text-white py-4 fixed top-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold text-[#00df9a] ml-2 md:ml-2 lg:-ml-16">PadelStore</h1>
        <div className="flex items-center">
          <button className="text-gray-300 p-3" onClick={toggleCart}>
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
