import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGamesWithPagination } from "../../Redux/actions";
import { FcPrevious, FcNext } from "react-icons/fc";
import Loader from "../Loader/Loader";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const ImagePreloader = ({ src }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
    return () => {
      img.onload = null;
    };
  }, [src]);

  return isLoaded ? (
    <div className="w-[80%] my-6">
        <img src={src} alt="" className="w-full h-full flex object-cover" />
    </div>
  ) : (
    <Loader />
  );
};

const GamesBar = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [btnUp, setBtnUp] = useState(true);
  const [btnDown, setBtnDown] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getGamesWithPagination(currentPage));
  }, [currentPage, dispatch]);

  const navigate = useNavigate();

  let games = useSelector((state) => state.pageGames);
  let gamesInPages = games.games;

  useEffect(() => {
    if (currentPage === 1) {
      setBtnUp(true);
      setBtnDown(false);
    } else if (currentPage === games.totalPages) {
      setBtnDown(true);
      setBtnUp(false);
    } else {
      setBtnDown(false);
      setBtnUp(false);
    }
  });

  const handleDown = (event) => {
    if (currentPage !== games.totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  const handleUp = (event) => {
    if (currentPage > 1) {
      const nextPage = currentPage - 1;
      setCurrentPage(nextPage);
    }
  };

  return (
    <div className="">
      <motion.div
        className="bg-gray-200 w-[100%] transition duration-500 hover:scale-105"
        style={{ display: "flex" }}
        drag=""
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        dragElastic={0.8}
      >
     
        <div >
          <div className="flex justify-center">
            <div className="my-8 w-full h-full flex items-center justify-center">
              <div className="flex justify-center">
                <NavLink
                  onClick={handleUp}
                  className="disabled:bg-gray-300 mt-2 flex items-center rounded-l me-4  bg-gray-700 w-[2rem] h-[5rem]"
                  disabled={btnUp}
                >
                  <FcPrevious className="w-6 h-6 " />
                </NavLink>
              </div>
              <div className="flex justify-between flex-nowrap w-[76%]">
                {gamesInPages?.map(({ id, thumbnail }) => (
                  <motion.button
                    key={id}
                    onClick={() => navigate(`/games/${id}`)}
                    className="flex items-center justify-center flex-col w-[20%] h-[20%] bg-gray-800 rounded-xl m-2 hover:bg-gray-500"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ImagePreloader src={thumbnail} />
                  </motion.button>
                ))}
              </div>
              <div className="flex justify-center">
                <NavLink
                  onClick={handleDown}
                  className="disabled:bg-gray-300 flex items-center rounded-r ms-4 bg-gray-700 w-[2rem] h-[5rem]"
                  disabled={btnDown}
                >
                  <FcNext className="w-6 h-6" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GamesBar;
