import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {
  const searchRef = useRef(null); // Referencia al input de búsqueda
  const [searchName, setSearchName] = useState({
    name: "",
  });
  const [game, setGame] = useState([]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Comprobar si se hizo clic fuera del input de búsqueda
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchName({ name: "" });
        setGame([]);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleChange = async (event) => {
    const inputValue = event.target.value;
    setSearchName({ name: inputValue });
    if (inputValue.length === 0) {
      setGame([]);
      return;
    }
    const response = await axios.get(
      `https://bckndll.onrender.com/games/page?name=${inputValue}`
    );
    const matches = response.data.games.filter((match) =>
      match.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    const matchesWithFirstLetter = matches.filter((match) =>
      match.name.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    const finalMatches = [...matchesWithFirstLetter, ...matches];
    const uniqueMatches = Array.from(new Set(finalMatches.map((match) => match.id))).map((id) =>
      finalMatches.find((match) => match.id === id)
    );
    setGame(uniqueMatches.slice(0, 5));
  };
  
  return (
  <div className="sticky">
    <div className="flex gap-2">
      <input
        ref={searchRef}
        placeholder="Search game..."
        type="search"
        value={searchName.name}
        onChange={handleChange}
        className="rounded text-center h-[30px] placeholder-center font-semibold text-black focus:outline-none"
      />
      <button className="text-white text-lg font-semibold no-underline hover:text-gray-500">
        <HiOutlineMagnifyingGlass size={30} />
      </button>
    </div>
    {searchName.name.length !== 0 && (
      <div className="origin-top-left absolute left-0 mt-2 w-full">
        <div className="rounded-md shadow-lg bg-gray-200 bg-opacity-6 ring-1 ring-black ring-opacity-5 divide-y divide-gray-300">
          {game.length !== 0 ? (
            <div className="flex flex-col">
              {game.map((match) => (
                <NavLink
                  key={match.id}
                  to={`/games/${match.id}`}
                  className="border-b border-gray-300 bg-gray-200 text-black italic font-bold text-sm p-3 hover:bg-gray-300 hover:text-black text-center w-auto"
                >
                  {match.name}
                </NavLink>
              ))}
            </div>
          ) : (
            <button
            className="border-b border-gray-300 bg-gray-200 text-black italic font-bold text-sm p-3 cursor-default"
            >
              No results
            </button>
          )}
        </div>
      </div>
    )}
  </div>
);
};

export default SearchBar;