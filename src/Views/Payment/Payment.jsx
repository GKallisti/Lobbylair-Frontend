import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import env from 'react-dotenv';

const PaymentComponent = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const stateUser = useSelector((state) => state.user);
  console.log(stateUser);
  const [selectedOption, setSelectedOption] = useState(null);
  const REACT_APP_KEY = env.REACT_APP_MERCADOPAGO_KEY;
  console.log(REACT_APP_KEY)
  const createPreference = async () => {
    initMercadoPago(REACT_APP_KEY);
    try {
      const response = await axios.post('http://localhost:3001/payment', {
        description: 'MercadoPago',
        price: 100,
        quantity: 1,
        currency_id: 'ARS',
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.error(error);
    }
  };

  const handlePayPal = async (option) => {
    setSelectedOption(option);

    try {
      const response = await fetch('http://localhost:3001/create-order', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.links && data.links[1] && data.links[1].href) {
          window.location.href = data.links[1].href;
        } else {
          console.error('Invalid response format: missing links[1].href');
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    setSelectedOption(null);
  };

  const handleMercadoPago = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-8">Choose a payment option:</h1>

      <div className="flex gap-4">
        <div
          className={`p-4 border rounded-md shadow-md flex items-center ${
            selectedOption === 'paypal' ? 'bg-blue-400' : 'bg-gray-100'
          }`}
          onClick={() => handlePayPal('paypal')}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="https://onx.la/c4cfc"
            alt="PayPal"
            style={{ cursor: 'pointer' }}
            className="w-12 h-12 mr-4 cursor-pointer"
          />
          <span className="font-bold text-black">PayPal</span>
        </div>

        <div
          className={`p-4 border rounded-md shadow-md flex items-center ${
            selectedOption === 'mercadopago' ? 'bg-green-200' : 'bg-white'
          }`}
          style={{ cursor: 'pointer' }}
          onClick={() => handleMercadoPago('mercadopago')}
        >
          {preferenceId && (
            <Wallet initialization={{ preferenceId: preferenceId }} />
          )}

          <img
            src="https://onx.la/b301d"
            alt="MercadoPago"
            style={{ cursor: 'pointer' }}
            className="w-12 h-12 mr-4 cursor-pointer"
          />
          <span className="font-bold text-black">MercadoPago</span>
        </div>
      </div>

      {selectedOption && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Selected option:</h2>
          <p>{selectedOption === 'paypal' ? 'PayPal' : 'MercadoPago'}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;

