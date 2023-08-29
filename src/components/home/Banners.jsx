import React, { useEffect, useState } from 'react';
import bannerpadel1 from '../media/Bannerpadel1.png'; 
import bannerpadel2 from '../media/Bannerpadel2.png'; 
import Bannerpadel3 from '../media/Bannerpadel3.png'; 
import { FaArrowRight } from 'react-icons/fa';

const Banners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [bannerpadel2, Bannerpadel3, bannerpadel1];

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    reinitLoop(20000); 
  };

  const reinitLoop = (time) => {
    clearInterval(loopInterval);
    setTimeout(loopSlider, time);
  };

  let loopInterval;

  const loopSlider = () => {
    loopInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
  };

  useEffect(() => {
    loopSlider();
    return () => clearInterval(loopInterval);
  }, []);

  return (
    <div className='sliderAx h-auto relative'>
      {images.map((image, index) => (
        <div
          key={index}
          className={`w-full mx-auto ${
            currentIndex === index ? 'block' : 'hidden'
          }`}
        >
          <div
            className={`bg-cover bg-center h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px] text-white py-24 px-10 object-fill transition-opacity ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`
            }}
          >
          </div>
          <br />
        </div>
      ))}
      <button
        onClick={goToNextSlide}
        className='absolute bottom-4 right-4 text-white text-2xl focus:outline-none hover:text-[#00df9a]'
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Banners;
