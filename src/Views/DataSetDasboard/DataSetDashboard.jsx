import { useState } from "react";
import DeleteGame from "../../Components/DeleteGame/DeleteGame";
import NewGame from "../../Components/NewGame/NewGame";
import 'react-toastify/dist/ReactToastify.css';

const DataSetDashboard = () => {
  const [show, setShow] = useState(false);
  const [showD, setShowD] = useState(false);
  const [gamesUpdated, setGamesUpdated] = useState(false);

  const handleNewGame = () => {
    setShow(true);
    setShowD(false);
  };

  const handleOnNewGame = () => {
    setShow(false);
    setGamesUpdated(true);
  };

  const handleDeleteGame = () => {
    setShow(false);
    setShowD(true);
  };

  const handleOnDelete = () => {
    setGamesUpdated(true);
    setShowD(false);
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
      </div>
    </div>
  );
};

export default DataSetDashboard;