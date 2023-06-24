import React, { useState } from "react";
import PaymentComponent from "../Payment/Payment";

const Subscription = () => {
  const subscriptionPlans = [
    {
      title: "Básico",
      price: "$20",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
    },
    {
      title: "Duradero",
      price: "$80",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
    },
    {
      title: "Extendido",
      price: "$140",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]
    }
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const handlePlanSelection = (index) => {
    if (selectedPlan === index) {
      // Si se hace clic en la tarjeta seleccionada, la deseleccionamos
      setSelectedPlan(null);
      setShowPayment(false);
    } else {
      setSelectedPlan(index);
      setShowPayment(true);
    }
  };

  return (
    <div className="flex flex-col h-[200px] items-center mb-4 mt-4">
      <div className="w-1/3 bg-white rounded-lg shadow-lg p-2">
        <h1 className="text-6xl font-bold text-black">Prices Plans</h1>
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
            <div className="bg-[#1f2937] rounded-lg ">
              <span className="text-3xl font-bold text-white">{plan.price}</span>
            </div>
            <ul className="mt-6 text-black">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              className="bg-[#1f2937] hover:bg-blue-700 text-white font-bold py-2 px-7 rounded mt-6"
              onClick={() => handlePlanSelection(index)}
            >
              {selectedPlan === index ? "Start your trial" : "Start your trial"}
            </button>
          </div>
        ))}
      </div>
      {showPayment && <PaymentComponent />}
    </div>
  );
};

export default Subscription;
