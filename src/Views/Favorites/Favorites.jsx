import { useState, useEffect } from "react";
import {  useDispatch } from "react-redux";
import { deleteFavorite } from "../../Redux/actions";
import GamesBar from "../../Components/GamesBar/GamesBar";


const Favorites = () => {
  const dispatch = useDispatch();
  const [myFavorites, setMyFavorites] = useState([]);
  

  useEffect(() => {
    const favoritesFromLocalStorage = localStorage.getItem("favorites");
    if (favoritesFromLocalStorage) {
      setMyFavorites(JSON.parse(favoritesFromLocalStorage));
    }
  }, []);
  



  const handleRemoveFavorite = (id) => {
    dispatch(deleteFavorite(id));

    
    const updatedFavorites = myFavorites.filter((favorite) => favorite.id !== id);
    setMyFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };


  return (
    <div>
      <div>
        <GamesBar className="" />
      </div>
      <h1 className="text-center text-3xl font-bold my-4">My Favorite Games</h1>
      <div className="grid grid-cols-2 gap-4">
        {myFavorites.map((favorite) => (
          <div key={favorite.id} className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
            <img src={favorite.thumbnail} alt={favorite.name} className="w-48 h-48 object-cover mb-4" />
            <h2 className="text-xl text-black font-bold text-center">{favorite.name}</h2>
            <button
              onClick={() => handleRemoveFavorite(favorite.id)}
              className="text-gray-500 hover:text-red-500 font-bold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
