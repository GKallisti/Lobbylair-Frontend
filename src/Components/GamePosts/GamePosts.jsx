import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { getPostsWithPagination, createPost } from "../../Redux/actions";
import { HiHeart } from "react-icons/hi";
import Response from "../Response/Response";
import { imageDef } from "../../Multimedia/imageDefault";


const GamePosts = () => {
  const location = useLocation();
  const { gameId, gameModeId } = queryString.parse(location.search);
  const dispatch = useDispatch();
  const stateUser = useSelector((state) => state.user);
  const navigate = useNavigate();


  //------------------esto es para el form------------------------------//
  const [userId, setUserId] = useState(stateUser.id);
  const [text, setText] = useState("");
  const [gameid, setGameid] = useState(gameId);
  const [gamemodeid, setGamemodeid] = useState(gameModeId);
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await dispatch(
        createPost({
          text,
          userid: userId,
          gameid,
          gamemodeid,
          name: stateUser.name,
        })
      );
      setRefresh(!refresh);
      if (response) {
        console.log("El post se creó exitosamente");
      } else {
        console.error("Error al crear el post");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
    setText("");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [btnNext, setBtnNext] = useState(false);
  const [btnPrev, setBtnPrev] = useState(true);
  const [loading, setLoading] = useState(true);

  const post = useSelector((state) => state.pagePosts);
  const pagedPosts = post.posts;

  useEffect(() => {
    setLoading(true);
    dispatch(getPostsWithPagination(currentPage, gameid, gamemodeid)).then(
      () => {
        setLoading(false);
        console.log("Posts obtenidos:", pagedPosts);
      }
    );
  }, [currentPage, dispatch, refresh]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (currentPage === 1) {
      setBtnNext(true);
      setBtnPrev(false);
    } else if (currentPage === +post.totalPages) {
      setBtnNext(true);
      setBtnPrev(false);
    } else {
      setBtnNext(false);
      setBtnPrev(false);
    }
  });

  const pages = Array.from(
    { length: post.totalPages },
    (_, index) => index + 1
  );

  const handleOnClick = (event) => {
    const selectedPage = parseInt(event.target.value);
    if (selectedPage !== currentPage) {
      setCurrentPage(selectedPage);
    }
  };

  const handleNext = (event) => {
    if (currentPage !== post.totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
    }
  };

  //--------------------------------------reacciones---------------------------------

  return (
    <div>
      <div className="">
        <div className="post-container mx-auto mt-[4rem] overflow-y-auto w-[80%]">
          <div className="flex justify-center">
            <form className="flex items-center mt-3" onSubmit={handleSubmit}>
              <input
                className="w-[40rem] text-black border-2 border-crimson p-6 flex justify-between items-start mb-1 shadow-md"
                type="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="
write the post"
              />
              <button
                className="ml-2 bg-black text-white border-none rounded-full px-4 py-2 text-lg font-bold cursor-pointer"
                type="submit">
                Create Post
              </button>
            </form>
          </div>

          <button
            onClick={handlePrev}
            disabled={btnPrev}
            className="bg-black text-white border-none rounded-[5rem] p-3 text-l font-bold cursor-pointer m-2 text-sm">
            {" "}
            Prev{" "}
          </button>

          {post.totalPages > 1 &&
            pages?.map((e) => (
              <button
                style={{ marginLeft: "5px", marginRight: "5px" }}
                key={e}
                value={e}
                onClick={handleOnClick}
                disabled={currentPage === e}>
                {e}
              </button>
            ))}
          <button
            onClick={handleNext}
            disabled={btnNext}
            className="bg-black text-white border-none rounded-[5rem] p-3 text-l font-bold cursor-pointer m-2 text-sm">
            {" "}
            Next{" "}
          </button>

          <div className="p-2">
            {pagedPosts?.map(({ id, createdAt, text, User, image, Game }) => {
              if (User) {
                return (
                  <div key={id}>
                    <div className="w-[80%] mx-auto mt-2 border-2 border-crimson p-2 flex flex-col items-start mb-1 ml-auto">
                    <div className="bg-gray-300 flex rounded-xl items-center justify-between shadow-md w-[100%]">
  <div className="flex items-center">
    <div className="rounded-full w-14 h-13">
      {post.User && post.User.image?.length > 1 ? (
        <img
          src={post.User.image}
          className={`rounded-full w-14 h-13`}
          alt="user"
        />
      ) : (
        <img
          src={imageDef}
          className={`rounded-full w-14 h-13`}
          alt="user"
        />
      )}
    </div>
    <div className="">
      <p className="text-black text-xs">Posted By:</p>
      <button
        onClick={() => {
          if (User.id === user.id)
            navigate(`/profile/${user.id}`);
          else {
            navigate(`/user/${User.id}`);
          }
        }}>
        <p className=" text-black text-xs font-bold ">
          {User?.name}
        </p>
      </button>
      
    </div>

  </div>
  <div className="items-end">
  <h1 className="text-s font-bold">{Game?.name}</h1> 
  </div>
  
  <div className="w-[20%]  p-4 flex flex-col items-end text-left">
    <p className="text-xs text-black mr-4">
      Created:{" "}
      {createdAt
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-")}
    </p>
  </div>
</div>

                      <div className="flex flex-col w-[80%] items-start ml-2">
                        {text}
                        <div>
                        

                        </div>
                        
                        
                        </div>
                        
                        <div className="w-[96%]  ml-2 flex flex-col items-end ">
                
                        </div>
                    </div>
                    
                    <div>
                      <Response postId={id} userId={stateUser.id} />
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

export default GamePosts;
