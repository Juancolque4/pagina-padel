import React from 'react';
import Introduccion from '../home/Introduccion';
import Footer from '../home/Footer';
import Banners from '../home/Banners';
import Info from '../home/Info';
import Ofertas from '../home/Ofertas';
import ScrollReveal from '../compartidos/ScrollReveal';
import SobreNosotros from '../home/SobreNosotros';

const Home = () => {
  return (
    <>
      <Introduccion />
      
      <ScrollReveal>
        <Banners />
      </ScrollReveal>

      <ScrollReveal>
        <Ofertas />
      </ScrollReveal>

      <ScrollReveal>
        <SobreNosotros/>
      </ScrollReveal>
      
      <ScrollReveal>
        <Info />
      </ScrollReveal>

      <ScrollReveal>
        <Footer />
      </ScrollReveal>


    </>
  );
};

export default Home;