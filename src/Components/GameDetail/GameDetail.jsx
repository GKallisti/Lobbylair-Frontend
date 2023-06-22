
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGameById, getPostsWithPagination } from "../../Redux/actions";
import { motion } from "framer-motion";
import { addFavorite, deleteFavorite } from "../../Redux/actions";

const GameDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail } = useParams();
  const [isFav, setIsFav] = useState(false);
  const myFavorites = useSelector((state) => state.myFavorites);

  // Obtener los datos de favoritos guardados en el Local Storage
  const storedFavorites = localStorage.getItem("favorites");
  const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorite(detail));
  
      // Restablecer el estado local de favoritos y el Local Storage
      const updatedFavorites = favorites.filter((fav) => fav.id !== detail);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      setIsFav(true);
      dispatch(addFavorite(detail, game.name, game.thumbnail));
  
      // Agregar el juego favorito al estado local y actualizar el Local Storage
      const newFavorite = { id: detail, name: game.name, thumbnail: game.thumbnail };
      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };
  useEffect(() => {
    // Verificar si el juego está en la lista de favoritos al cargar el componente
    if (myFavorites) {
      myFavorites.forEach((fav) => {
        if (fav.id === detail) {
          setIsFav(true);
        }
      });
    }
  }, [myFavorites, detail]);

  useEffect(() => {
    dispatch(getGameById(detail));
    dispatch(getPostsWithPagination(detail));
  }, [detail]);

  useEffect(() => {
    setIsFav(false); // Reiniciar el estado de isFav al cambiar el parámetro 'detail'
  }, [detail]);

  let game = useSelector((state) => state.game);
  let gamePosts = useSelector((state) => state.pagePosts);

  let lastPosts = gamePosts.posts;
  const gameModes = game.GameModes;

  const handleOnClick = (id) => {
    let gameId = detail;
    let gameModeId = id;
    navigate(`/post?gameId=${gameId}&gameModeId=${gameModeId}`);
  };

  return (
    <div className="">
      <div className="md:w-[50%] ml-0 md:ml-1 "></div>
      
      <div className="flex justify-center ">
        <div
          className="flex flex-col items-center justify-center w-[50%] h-[600px] bg-gray-200 rounded-lg p-3 mt-[4rem] mx-[5rem] shadow-lg transform rotate-x-2 rotate-y-2 perspective-lg"
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}
        >
          <div className="bg-gray-500 w-[3rem]">
  {isFav ? (
    <button onClick={handleFavorite} className="text-red-500">
      ❤️
    </button>
  ) : (
    <button onClick={handleFavorite} className="text-gray-500">
      🤍
    </button>
  )}
</div>
          <motion.div
            className="flex items-center justify-center flex-col w-[45%] h-[45%] bg-gray-800 rounded-xl m-2 hover:bg-gray-500"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={game.thumbnail}
              className="mx-auto w-[13rem] h-[13rem]"
              alt=""
            />
          </motion.div>
          <h1 className="text-center text-2xl font-bold mt-[1rem] p-6 text-black cursor-default">
            {game.name}
          </h1>

          {gameModes?.map(({ id, name }) => {
            return (
              <button
                onClick={() => handleOnClick(id)}
                key={"gameMode" + id}
                className="text-gray-200 block rounded-[5rem] text-center font-medium px-6 py-3 bg-gray-900 hover:bg-black hover:text-white m-3 transition-colors duration-300 ease-in-out"
              >
                New post of {name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-1/3">
        <div className="mt-[3rem]">
          <div key="Posts in detail">
            {lastPosts?.map(({ id, createdAt, GameMode, text, User }) => {
              if (User && GameMode) {
                return (
                  <div
                    key={id}
                    className=" items-start   my-[1rem]  border-2 border-crimsonrounded-lg shadow-md  w-[50rem] mx-auto mt-  border-crimson p-6 flex justify-between mb-[1rem]"
                  >
                    <div className=" bg-gray-300  w-[30%] flex flex-col justify-center items-center shadow-md">
                      <img
                        src="https://source.unsplash.com/120x120/?person"
                        alt=""
                        className="rounded-[1rem] w-[5.9rem] h-full cursor-pointer p-3 "
                      />
                      <h1 className="text-sm font-bold text-black">
                        <p className="text-sm text-black">
                          Game mode: {GameMode.name}
                        </p>
                      </h1>
                      
                      <p className="text-black font-bold text-sm">
                        Posted by:
                      </p>
                      <motion.Link
                        to={`/user/${User.id}`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <p className="text-black  text-sm">{User.name}</p>
                      </motion.Link>

                      <div className="flex items-center mt-2">
                        <p className="text-sm font-bold text-black mb-3 ">
                          Created:{" "}
                          {createdAt
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </p>
                      </div>
                    </div>
                    <div className="w-[68%] h-full ">
                      <h1 className="text-l mt-3 p-4 flex flex-col items-center text-left">
                        {text}
                      </h1>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default GameDetail;
