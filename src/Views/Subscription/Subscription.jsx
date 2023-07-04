import React, { useState, useEffect } from "react";
import PaymentComponent from "../Payment/Payment";
import { FcApproval } from 'react-icons/fc';
import axios from 'axios';

const Subscription = () => {
  const [plan1, setPlan1] = useState(0);
  const [plan2, setPlan2] = useState(0);
  const [plan3, setPlan3] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [showPayment, setShowPayment] = useState(false);
  const [userId, setUserId] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.bluelytics.com.ar/v2/latest');
        const blue = response.data.blue.value_avg;
        console.log('Dolar Blue:', blue);
        setPlan1(blue * 10);
        setPlan2(blue * 20);
        setPlan3(blue * 40);
      } catch (error) {
        console.error('Error fetching Dolar Blue price:', error);
      }
    };

    fetchData();
  }, []);

  const subscriptionPlans = [
    {
      title: "Basic",
      price: { usd: "$10", ars: plan1.toString() },
      features: ["Access the forum, view posts and discussions.", "Limited participation", "Advertisements and promotions"],
      amount: { usd: 10, ars: plan1 },
      type: "basic",
    },
    {
      title: "Standard",
      price: { usd: "$20", ars: plan2.toString() },
      features: ["Full forum access", "Creation of new discussions", "Profile customization", "Ad-free experience"],
      amount: { usd: 20, ars: plan2 },
      type: "standard",
    },
    {
      title: "Premium",
      price: { usd: "$40", ars: plan3.toString() },
      features: ["Exclusive access", "Unrestricted participation", "Ad-free experience", "Priority support"],
      amount: { usd: 40, ars: plan3 },
      type: "premium",
    },
  ];

  const handlePlanSelection = async (index) => {
    if (selectedPlan === index) {
      setSelectedPlan(null);
      setShowPayment(false);
    } else {
      setSelectedPlan(index);
      setShowPayment(true);

      if (userId) {
        try {
          await axios.put(`/users/${userId}`, { isPremium: true });
          console.log("User updated");
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
    }
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

   useEffect(() => {
    const createUser = async () => {
      try {
        const response = await axios.post("/users", {
          name: "Your Name",
          email: "your-email@example.com",
          password: "YourPassword",
          image: "YourImageURL",
        });
        const { userId } = response.data;
        setUserId(userId);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    createUser();
  }, []);

  return (
    <div className="flex flex-col h-[200px] items-center mb-4 mt-4">
      <div className="w-1/3 bg-white rounded-lg shadow-lg p-2">
        <h1 className="text-6xl font-bold text-black">Price Plans</h1>
        <p className="font-bold mt-3 text-black">
          Choose the best plan for you!
        </p>
      </div>

      <div className="flex justify-center mt-8">
        {subscriptionPlans.map((plan, index) => (
          <div
            key={index}
            className={`w-1/3 bg-white rounded-lg shadow-xl p-6 mx-2 ${
              selectedPlan === index ? "bg-yellow-200" : ""
            } cursor-pointer`}
            onClick={() => handlePlanSelection(index)}
          >
            <h2 className="text-3xl font-bold mb-4 text-black">
              {plan.title}
            </h2>
            <div className="bg-[#1f2937] rounded-lg">
              <span className="text-3xl font-bold text-white">
                {plan.price[selectedCurrency]}
              </span>
            </div>
            <ul className="mt-6 text-black text-start">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <FcApproval className="inline-block mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="bg-[#1f2937] hover:bg-blue-700 text-white font-bold py-2 px-7 rounded mt-6"
              onClick={() => handlePlanSelection(index)}
            >
              {selectedPlan === index ? "Buy now" : "Buy now"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label htmlFor="currency" className="mr-2">
          Select Currency:
        </label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="text-black"
        >
          <option value="usd">USD</option>
          <option value="ars">ARS</option>
        </select>
      </div>

      {showPayment && selectedPlan !== null && (
        <PaymentComponent
          amount={subscriptionPlans[selectedPlan].amount[selectedCurrency]}
          type={subscriptionPlans[selectedPlan].type}
          currency={selectedCurrency}
        />
      )}
    </div>
  );
};

export default Subscription;