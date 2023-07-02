import { useState } from "react";
import AddAdmin from "../../Components/Add Admin/AddAdmin";
import DeleteGame from "../../Components/DeleteGame/DeleteGame";
import DeleteUser from "../../Components/DeleteUser/DeleteUser";
import NewGame from "../../Components/NewGame/NewGame";
import DeleteAdmin from "../../Components/Delete Admin/Delete Admin";

import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [show, setShow] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showU, setShowU] = useState(false);
  const [showM, setShowM] = useState(false);
  const [showA, setShowA] = useState(false);
  const [gamesUpdated, setGamesUpdated] = useState(false);

  const handleNewGame = () => {
    setShow(true);
    setShowD(false);
    setShowU(false);
    setShowM(false);
    setShowA(false);
  };

  const handleOnNewGame = () => {
    setShow(false);
    setGamesUpdated(true);
  };

  const handleDeleteGame = () => {
    setShow(false);
    setShowD(true);
    setShowU(false);
    setShowM(false);
    setShowA(false);
  };

  const handleOnDelete = () => {
    setGamesUpdated(true);
    setShowD(false);
  };

  const handleAddAdmin = () => {
    setShow(false);
    setShowD(false);
    setShowU(false);
    setShowM(true);
    setShowA(false);
  };

  const handleAddedAdmin = () => {
    setShowM(false);
  };

  const handleDeleteUser = () => {
    setShow(false);
    setShowD(false);
    setShowU(true);
    setShowM(false);
    setShowA(false);
  };

  const afterDelete = () => {
    setShowU(false);
  };

  const handleDeleteAdmin = () => {
    setShow(false);
    setShowD(false);
    setShowU(false);
    setShowM(false);
    setShowA(true);
  };

  const afterDeleteAdmin = () => {
    setShowA(false);
  };

  return (
    <div className="w-[100%]  justify-center items-center">
    <div className="flex mt-20 mx-auto bg-gray-200  flex-col w-[90%] items-center rounded-[2rem] justify-center shadow-2xl">
      <div className="mb-4 justify-center">
        <h1 className="text-xl font-bold mb-4 my-8 text-gray-800 text-center">
         Dashboard Admin
        </h1>
      </div>
      <div className="flex p-2 my-5">
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={handleNewGame}
        >
          <h1>New Game</h1>
        </button>
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={handleDeleteGame}
        >
          Delete Game
        </button>
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          value="Mod Admin"
          onClick={handleAddAdmin}
        >
          Add Admin
        </button>
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          value="Del User"
          onClick={handleDeleteAdmin}
        >
          Delete an admin
        </button>
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          value="Del User"
          onClick={handleDeleteUser}
        >
          Delete an User
        </button>
      </div>
      <div>
        {show && (
          <div>
            <NewGame handleOnNewGame={handleOnNewGame} />
            <button
              className="py-2 my-3 px-4 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShow(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {showD && (
        <div>
          <button
            className="m-1 py-2 my-4 px-4 border border-transparent rounded-md shadow-sm hover:text-black text-sm font-medium text-white bg-gray-800 hover:bg-white"
            onClick={() => setShowD(false)}
          >
            Cancel
          </button>
          <DeleteGame handleOnDelete={handleOnDelete} handleDeleteGame={handleDeleteGame} />
        </div>
      )}
      <div>
        {showM && (
          <div>
            <button
              className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800"
              onClick={() => setShowM(false)}
            >
              Cancel
            </button>
            <AddAdmin handleAddedAdmin={handleAddedAdmin} />
          </div>
        )}
      </div>
      <div>
        {showA && (
          <div>
            <button
              className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800"
              onClick={() => setShowA(false)}
            >
              Cancel
            </button>
            <DeleteAdmin afterDeleteAdmin={afterDeleteAdmin} />
          </div>
        )}
      </div>
      <div>
        {showU && (
          <div>
            <button
              className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800"
              onClick={() => setShowU(false)}
            >
              Cancel
            </button>
            <DeleteUser afterDelete={afterDelete} />
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
