import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getGameModes, postGames } from "../../Redux/actions";

const NewGame = ({ handleOnNewGame }) => {
  const dispatch = useDispatch();
  let z = 1;
  let x = 1;

  const [genres, setGenres] = useState([]);
  const [gameModes, setGameModes] = useState([]);
  const [error, setError] = useState({
    name: "",
  });

  const [data, setData] = useState({
    name: "",
    thumbnail: "",
    genres: [],
    gameModes: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getGameModes());
  }, []);

  const allGenres = useSelector((state) => state.genre);
  const allGameModes = useSelector((state) => state.gameMode);

  const handleOnChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleGameModesChanges = (event) => {
    if (event.target.checked) {
      setGameModes([...gameModes, event.target.value]);
      setData({ ...data, gameModes: [...gameModes, event.target.value] });
    } else {
      const updatedGameModes = gameModes.filter((g) => g !== gameModes);
      setGameModes(updatedGameModes);
      setData({ ...data, gameModes: updatedGameModes });
    }
  };

  const handleGenresChange = (event) => {
    if (event.target.checked) {
      setGenres([...genres, event.target.value]);
      setData({ ...data, genres: [...genres, event.target.value] });
    } else {
      const updatedGenres = gameModes.filter((g) => g !== genres);
      setGameModes(updatedGenres);
      setData({ ...data, genre: updatedGenres });
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(postGames(data));
    setData({
      name: "",
      thumbnail: "",
      gameModes: [],
      genres: [],
    });
    handleOnNewGame();
  };

  return (
    <form key="New Game Form" onSubmit={handleOnSubmit}>
      <label className="mb-1 text-sm font-bold text-gray-800" htmlFor="Name">
        Game Name
      </label>
      <input
        type="text"
        placeholder="Introduce a game name"
        name="name"
        className="p-1 m-1 border border-gray-300 rounded-[1rem]"
        value={data.name}
        onChange={handleOnChange}
      />
      <hr />
      <label
        className="mb-1 text-sm font-bold text-gray-800"
        htmlFor="thumbnail"
      >
        Thumbnail
      </label>
      <input
        type="text"
        className="p-1 m-1 border border-gray-300 rounded-[1rem]"
        placeholder="Introduce an Url"
        name="thumbnail"
        value={data.thumbnail}
        onChange={handleOnChange}
      />
      <hr />
      <label className="mb-1 text-sm font-bold text-gray-800" htmlFor="">
        Game modes
      </label>
      <div className="flex flex-row place-content-center">
        {allGameModes.map((gnr) => (
          <div>
            <ul>
              <li>
                <input
                  onChange={handleGameModesChanges}
                  type="checkbox"
                  value={gnr.name}
                  className="p-1 m-1 border border-gray-300 rounded-[1rem]"
                  key={"a" + z++}
                  name="name"
                />
                <label
                  className="m-1 text-sm font-bold text-gray-800"
                  htmlFor={"a" + z++}
                >
                  {gnr.name}
                </label>
              </li>
            </ul>
          </div>
        ))}
      </div>
      <hr />

      <label className="mb-1 text-sm font-bold text-gray-800" htmlFor="">
        Genres
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "Repeat(6, 1fr)" }}>
        {allGenres.map((gnr) => (
          <div>
            <ul>
              <li>
                <input
                  type="checkbox"
                  onChange={handleGenresChange}
                  value={gnr.name}
                  className="p-1 m-1 border border-gray-300 rounded-[1rem]"
                  key={"a" + x++}
                />
                <label
                  className="m-1 text-sm font-bold text-gray-800"
                  htmlFor={"a" + x++}
                >
                  {gnr.name}
                </label>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <hr />
      <button
        className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="submit"
      >
        New Game
      </button>
      <hr />
    </form>
  );
};

export default NewGame;
