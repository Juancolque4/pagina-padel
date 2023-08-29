import React, { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const Checkout = () => {
 // const Navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    dni: '',
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    province: '',
    postalCode: '',
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleContinue = async () => {
    // Aquí podrías enviar los datos al servidor y guardarlos en la base de datos
    try {
      // Primero, crea una entrada en la tabla de pedidos
      const orderResponse = await axios.post('http://localhost:3009/orders', {
        contactInfo,
        deliveryInfo,
        // Otros campos relacionados al pedido
      });

      const orderId = orderResponse.data.id;

      // Luego, guarda los productos del carrito en la tabla de productos del pedido
      const cartItemsResponse = await axios.get('http://localhost:3009/items_carrito');
      const cartItems = cartItemsResponse.data;

      // Recorre los elementos del carrito y guarda cada uno en la tabla correspondiente
      for (const cartItem of cartItems) {
        await axios.post('http://localhost:3009/order_items', {
          order_id: orderId,
          product_id: cartItem.producto_id,
          quantity: cartItem.cantidad,
        });
      }

      // Después de completar el pedido, redirige a la página de resumen o agradecimiento
      //Nvigate.push(`/checkout/resumen/${orderId}`);
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
    }
  };

  return (
    <div className='container mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Checkout</h1>
      <div className='bg-white p-6 rounded-md shadow-md'>
        <h2 className='text-lg font-semibold mb-4'>Datos de contacto</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2' htmlFor='name'>
              Nombre Completo
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={contactInfo.name}
              onChange={handleContactChange}
              className='w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2' htmlFor='email'>
              Correo Electrónico
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={contactInfo.email}
              onChange={handleContactChange}
              className='w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2' htmlFor='dni'>
              DNI
            </label>
            <input
              type='text'
              id='dni'
              name='dni'
              value={contactInfo.dni}
              onChange={handleContactChange}
              className='w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300'
              required
            />
          </div>
        </form>
      </div>
      <div className='bg-white p-6 mt-4 rounded-md shadow-md'>
        <h2 className='text-lg font-semibold mb-4'>Información de entrega</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2' htmlFor='province'>
              Provincia
            </label>
            <select
              id='province'
              name='province'
              value={deliveryInfo.province}
              onChange={handleDeliveryChange}
              className='w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300'
              required
            >
              <option value=''>Seleccionar provincia</option>
              {/* Aquí puedes mapear las provincias */}
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2' htmlFor='postalCode'>
              Código Postal
            </label>
            <input
              type='text'
              id='postalCode'
              name='postalCode'
              value={deliveryInfo.postalCode}
              onChange={handleDeliveryChange}
              className='w-full px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300'
              required
            />
          </div>
        </form>
      </div>
      <div className='mt-6'>
        <button
          onClick={handleContinue}
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none'
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default Checkout;
