import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getGameById,
  getPostsWithPagination,
  getFavorite,
} from "../../Redux/actions";
import { motion } from "framer-motion";
import axios from "axios";
const GameDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detail } = useParams();
  const id = detail;
  const [isFav, setIsFav] = useState(false);
  const myFavorites = useSelector((state) => state.myFavorites);

  const handleFavorite = async () => {
    if (isFav) {
      setIsFav(false);
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      await axios.delete(
        `https://llbcknd.onrender.com/favorite?gameId=${id}&token=${token}`
      );
    } else {
      setIsFav(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      await axios.post("https://llbcknd.onrender.com/favorite", {
        token,
        id,
      });
    }
  };

  useEffect(() => {
    if (myFavorites.some((fav) => fav.id === Number(id))) {
      setIsFav(true);
    } else setIsFav(false);
  }, [id]);

  useEffect(() => {
    dispatch(getGameById(id));
    dispatch(getPostsWithPagination(id));
    dispatch(getFavorite());
  }, [id]);

  let game = useSelector((state) => state.game);
  let gamePosts = useSelector((state) => state.pagePosts);

  let lastPosts = gamePosts.posts;
  const gameModes = game.GameModes;

  const handleOnClick = (id) => {
    let gameId = id;
    let gameModeId = id;
    navigate(`/post?gameId=${gameId}&gameModeId=${gameModeId}`);
  };

  return (
    <div className="">
      <div className="w-[100%]">
        <div
          className=" h-[300px] w-[80%] mx-auto bg-gray-300  rounded-lg p-3 mt-[2rem]  shadow-lg transform rotate-x-2 rotate-y-2 perspective-lg"
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}>
          <div className="bg-gray-500 w-[3rem] h-[2rem] flex items-center justify-center mx-[2rem] ">
            {isFav ? (
              <button onClick={handleFavorite} className="text-red-500">
                ❤️
              </button>
            ) : (
              <button onClick={handleFavorite} className="text-gray-500 ">
                🤍
              </button>
            )}
          </div>
          <div className="flex items-center mt-[1rem] mx-[1rem] ">
            <motion.div
              className="flex items-center justify-center w-[11rem] h-[11rem] bg-gray-800 rounded-xl m-2 hover:bg-gray-500"
              whileHover={{ scale: 1.1 }}>
              <img
                src={game.thumbnail}
                className="mx-auto w-full h-full"
                alt=""
              />
            </motion.div>
            <h1 className="text-4xl font-bold  text-black cursor-default mx-[3rem]">
              <div className="mt-[-3rem]">{game.name}</div>

              <div className="mt-[2rem]">
                {gameModes?.map(({ id, name }) => {
                  return (
                    <motion.button
                      onClick={() => handleOnClick(id)}
                      key={"gameMode" + id}
                      className="text-gray-200 block rounded-[5rem] text-center font-medium 
                                text-base px-3 py-1 bg-gray-900 hover:bg-black hover:text-white m-3 
                                transition-colors duration-300 ease-in-out"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}>
                      New post of {name}
                    </motion.button>
                  );
                })}
              </div>
            </h1>
          </div>
        </div>
      </div>

      <div key="Posts in id">
        {lastPosts?.map(({ id, createdAt, GameMode, text, User }) => {
          if (User && GameMode) {
            return (
              <div key={id} className=" ">
                <div className="w-[80%] mx-auto mt-4 border-2 border-crimson p-2 flex flex-col items-start mb-1 ml-auto">
                  <div className="bg-gray-300 flex rounded-xl items-center justify-between shadow-md w-[100%]">
                    <div className="flex items-center">
                      <img
                        src="https://source.unsplash.com/120x120/?person"
                        alt=""
                        className={`rounded-[2rem] ${
                          User?.name ? "w-[35%]" : "w-[50%]"
                        } h-full cursor-pointer p-2`}
                      />
                      <div className="">
                        <p className="text-black text-xs">Posted By:</p>
                        <Link
                          to={`/user/${User.id}`}
                          whileHover={{ scale: 1.1 }}>
                          <p className=" text-black text-xs font-bold ">
                            {User.name}
                          </p>
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="text-black  text-xs mr-9 ">
                        Game mode:
                        <h1 className="font-bold"> {GameMode.name}</h1>
                      </div>

                      <p className="text-xs text-black mr-4">
                        Created:{" "}
                        {createdAt.slice(0, 10).split("-").reverse().join("-")}
                      </p>
                    </div>
                  </div>
                  <div className="w-[100%]  p-4 flex flex-col items-start text-left">
                    {text}
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default GameDetail;
