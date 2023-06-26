import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGame, getAllGames } from "../../Redux/actions";
import Draggable from "react-draggable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteGame = () => {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.games);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const gamesPerPage = 9;

  const filteredGames = allGames.filter((game) =>
    game.name.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  const handleButton = (game) => {
    const gameId = game.id;
    dispatch(deleteGame(gameId))
      .then(() => {
        toast.success(`${game.name} has been deleted`);
        dispatch(getAllGames());
      })
      .catch((error) => {
        toast.error("An error occurred while deleting the game");
        console.error(error);
      });
  };

  const handleDrag = (gameId) => (e, { x, y }) => {
    console.log(gameId, x, y);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer rounded-full border px-3 py-1 mx-1 ${
            i === currentPage ? "bg-gray-800 text-white" : "bg-white"
          } ${i === currentPage ? "dark-mode" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  const renderGames = () => {
    if (currentGames.length === 0) {
      return (
        <div className="text-red-500 text-center mt-4">
          No games found with the provided filter.
        </div>
      );
    }

    return currentGames.map((game) => (
      <Draggable key={game.id.toString()} onStop={handleDrag(game.id)}>
        <div className="bg-gray-300 w-[100%] rounded p-4 shadow-3xl border-l-black h-full">
          <label htmlFor={`game-name-${game.id}`} className="block text-black font-semibold">
            {game.name}
          </label>
          <button onClick={() => handleButton(game)} className="mt-2 text-red-700">
            Delete
          </button>
        </div>
      </Draggable>
    ));
  };

  return (
    <>
      <div className="flex flex-col items-center rounded-[2rem] justify-between mb-9 mt-2">
        <div>
          <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-[3rem] px-4 py-2 focus:outline-none dark:text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex mt-3 ms-4 dark:text-gray-900">
            {renderPageNumbers()}
          </div>
        </div>
      </div>
      <div className="w-[60rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {renderGames()}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default DeleteGame;
