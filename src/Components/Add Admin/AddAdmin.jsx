import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const AddAdmin = () => {
  const [email, setEmail] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await axios(`https://llbcknd.onrender.com/users/email/${email}`);
    const user = res.data;
    if (user.length === 0) {
      return alert("User not found");
    }
    const userId = user[0].id;
    try {
      await axios.put(`https://llbcknd.onrender.com/users/${userId}`, {
        isAdmin: true,
      });
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="max-w-xs mx-auto mt-8">
      <div className="flex items-center border-b-2 border-cyan-950 py-2">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          className=" bg-cyan-950 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default AddAdmin;
