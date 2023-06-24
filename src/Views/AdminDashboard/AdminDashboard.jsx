import { useState } from "react";
import AddAdmin from "../../Components/Add Admin/AddAdmin";
import DeleteGame from "../../Components/DeleteGame/DeleteGame";
import DeleteUser from "../../Components/DeleteUser/DeleteUser";
import NewGame from "../../Components/NewGame/NewGame";
import DeleteAdmin from "../../Components/Delete Admin/Delete Admin";

const AdminDashboard = () => {
  const [show, setShow] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showU, setShowU] = useState(false);
  const [showM, setShowM] = useState(false);
  const [showA, setShowA] = useState(false);

  const handleNewGame = () => {
    if (!show) setShow(true);
    if (show) setShow(false);
    if (showD || showM || showU || showA) {
      setShowD(false);
      setShowU(false);
      setShowM(false);
      setShowA(false);
    }
  };
  const handleOnNewGame = () => {
    setShow(false);
  };
  const handleDeleteGame = () => {
    if (!showD) setShowD(true);
    if (showD) setShowD(false);
    if (show || showM || showU || showA) {
      setShow(false);
      setShowU(false);
      setShowM(false);
      setShowA(false);
    }
  };

  const handleOnDelete = () => {
    setShowD(false);
  };

  const handleAddAdmin = () => {
    if (!showM) setShowM(true);
    if (showM) setShowM(false);
    if (show || showD || showU || showA) {
      setShow(false);
      setShowU(false);
      setShowD(false);
      setShowA(false);
    }
  };

  const handleAddedAdmin = () => {
    setShowM(false);
  };
  const handleDeleteUser = () => {
    if (!showU) setShowU(true);
    if (showU) setShowU(false);
    if (show || showD || showM || showA) {
      setShow(false);
      setShowM(false);
      setShowD(false);
      setShowA(false);
    }
  };

  const afterDelete = () => {
    setShowU(false);
  };

  const handleDeleteAdmin = () => {
    if (!showA) setShowA(true);
    if (showA) setShowA(false);
    if (show || showD || showM || showU) {
      setShow(false);
      setShowM(false);
      setShowD(false);
      setShowU(false);
    }
  };
  const afterDeleteAdmin = () => {
    setShowA(false);
  };

  return (
    <div className="mt-24 bg-gray-200 flex flex-col ml-11 items-center rounded-[2rem] justify-center shadow-2xl">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Imagen con posteos favoritos/juegos mas jugados
        </h1>
      </div>
      <div className="flex p-4">
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleNewGame}
        >
          <h1>New Game</h1>
        </button>
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleDeleteGame}
        >
          Delete Game
        </button>
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          value="Mod Admin"
          onClick={handleAddAdmin}
        >
          Add Admin
        </button>
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          value="Del User"
          onClick={handleDeleteAdmin}
        >
          Delete an admin
        </button>
        <button
          className="flex justify-center m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          value="Del User"
          onClick={handleDeleteUser}
        >
          Delete an User
        </button>
      </div>
      <div>
        {show && (
          <div>
            <NewGame handleOnNewGame={handleOnNewGame} />{" "}
            <button
              className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setShowD(false)}
          >
            Cancel
          </button>
          <DeleteGame handleOnDelete={handleOnDelete} />
        </div>
      )}
      <div>
        {showM && (
          <div>
            <button
              className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
              className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setShowU(false)}
            >
              Cancel
            </button>
            <DeleteUser afterDelete={afterDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
