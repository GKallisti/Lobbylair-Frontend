import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { ethers } from "ethers";
import TxList from "./TxList";

async function getEthereumPriceInUSD() {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
      { timeout: 5000 }
    );
    const { ethereum: { usd } } = response.data;
    return usd;
  } catch (error) {
    console.error('Error obtaining Ethereum price:', error);
    throw error;
  }
}

const PaymentComponent = ({ amount, type, currency }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const stateUser = useSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = useState(null);
  const REACT_APP_KEY = window.env.REACT_APP_MERCADOPAGO_KEY;
  const [errorMessage, setErrorMessage] = useState(null)
  const [txs, setTxs] = useState([]);

  const startPayment = async ({ setErrorMessage, setTxs, ether, addr }) => {
    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      ethers.utils.getAddress(addr);
      const tx = await signer.sendTransaction({
        to: addr,
        value: ethers.utils.parseEther(ether)
      });
      console.log({ ether, addr });
      console.log("tx", tx);
      setTxs([tx]);
    } catch (err) {
      setErrorMessage(errorMessage);
    }
  };

  const handleClick = async () => {

    const ethPriceUSD = await getEthereumPriceInUSD();
    const cantidadETH = amount / ethPriceUSD;
    console.log(cantidadETH)
    await startPayment({
      setErrorMessage,
      setTxs,
      ether: cantidadETH.toString(),
      addr: '0xC1ED30e08cDD9D6fb812D7fDa7a30201069722B5'
    });
  };

  const createPreference = async () => {
    initMercadoPago(REACT_APP_KEY);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      const response = await axios.post("https://bckndll.onrender.com/payment", {
        token: token,
        amount: amount,
        type: type,
        currency: currency,
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
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      const response = await axios.post("https://bckndll.onrender.com/create-order", {
        token: token,
        amount: amount,
        type: type,
        currency: currency,
      });

      if (response) {
        const data = response.data;
        console.log(data);
        if (data.links && data.links[1] && data.links[1].href) {
          window.location.href = data.links[1].href;
        } else {
          console.error("Invalid response format: missing links[1].href");
        }
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
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
    <div className="flex flex-col items-center mt-7 h-screen ">
      <h1 className="text-2xl font-bold mb-8">Choose a payment option:</h1>

      {currency === "usd" && (
        <div className="flex gap-4">
          <div
            className={`p-4 border rounded-md shadow-md flex items-center ${
              selectedOption === "paypal" ? "bg-blue-400" : "bg-gray-100"
            }`}
            onClick={() => handlePayPal("paypal")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="https://onx.la/c4cfc"
              alt="PayPal"
              style={{ cursor: "pointer" }}
              className="w-12 h-12 mr-4 cursor-pointer"
            />
            <span className="font-bold text-black">PayPal</span>
          </div>

          <div
            className={`p-4 border rounded-md shadow-md flex items-center ${
              selectedOption === "metamask" ? "bg-orange-200" : "bg-white"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick("metamask")}
          >
            <img
              src="https://www.sketchappsources.com/resources/source-image/metamask-fox-logo.png"
              alt="Metamask"
              style={{ cursor: "pointer" }}
              className="w-12 h-12 mr-4 cursor-pointer"
            />
            <span className="font-bold text-black">Metamask</span>
          </div>
        </div>
      )}

      {currency !== "usd" && (
        <div
          className={`p-4 border rounded-md shadow-md flex items-center ${
            selectedOption === "mercadopago" ? "bg-green-200" : "bg-white"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleMercadoPago("mercadopago")}
        >
          {preferenceId && (
            <Wallet initialization={{ preferenceId: preferenceId }} />
          )}

          <img
            src="https://onx.la/b301d"
            alt="MercadoPago"
            style={{ cursor: "pointer" }}
            className="w-12 h-12 mr-4 cursor-pointer"
          />
          <span className="font-bold text-black">MercadoPago</span>
        </div>
      )}

      <errorMessage message={errorMessage} />
      <TxList txs={txs} />
    </div>
  );
};

export default PaymentComponent;