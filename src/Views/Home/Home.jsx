import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";


import {
  getAllPosts,
  getAllUsers,
  getFavorite,
  orderPostByCreation,
} from "../../Redux/actions";
import { imageDef } from "../../Multimedia/imageDefault";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fav = useSelector((state) => state.myFavorites);
  const images = fav.map((favorite) => favorite.thumbnail);
  

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    localStorage.setItem("isAuthenticated", true);
  }, []);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers());
    dispatch(getFavorite());
  }, []);

  const posts = useSelector((state) => state.posts);

  const handlerOrder = (event) => {
    dispatch(orderPostByCreation(event.target.value));
  };

  const handleDragEnd = (event, info) => {
    console.log("Image dragged and dropped!");
  };


  return (
    <>
      <div className="flex md:flex-row w-full h-full">
        <div className="w-[60%]">
          <div className="post-container mx-auto overflow-y-auto mt-[1rem] justify-start items-start border-r-2 border-gray-200">
            <div className="">
              <div className="items-center text">
                <h1 className="ml-[12rem]">Order:</h1>
              </div>
              <div className="">
                <div className="relative left-12 ml-[9rem] inline-flex">
                  <select
                    name="Creation Order"
                    key="Order"
                    onChange={handlerOrder}
                    className="appearance-none bg-gray-900 border text-white border-gray-300 rounded-md px-4 py-2 pr-8 leading-tight focus:outline-none focus:border-blue-500 text-sm"
                  >
                    <option value="A" className="bg-black text-white">
                      Old first
                    </option>
                    <option value="D">New first</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12L6 8h8l-4 4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {posts.map((post) => {
              if (post && post.id) {
                return (
                  <div className=" " key={post.id}>
                    <div className="w-[80%] mx-auto mt-2 border-2 border-crimson p-2 flex flex-col items-start mb-1 ml-auto">
                      <div className="bg-gray-300 flex rounded-xl items-center justify-between shadow-md w-[100%]">
                        <div className="flex items-center">
                          {
                            post.User?.image?.length >1 ? <img src={post.User?.image} className={`rounded-[2rem] h-10 w-10`}/>
                            : <img src={imageDef} className={`rounded-[2rem] h-10 w-10`} />
                          }
                          <div className="">
                            {post.User?.name && (
                              <>
                                <p className="text-black text-xs">Posted By:</p>
                                <button onClick={
                                  ()=>{
                                    if(post.User.id === user.id) navigate(`/profile/${user.id}`)
                                    else{navigate (`/user/${post.User.id}`)}
                                  }}>

                                  <p className=" text-black text-xs font-bold ">
                                    {post.User?.name}
                                  </p>
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <div>
                          <h1>{post.Game?.name}</h1>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-black  text-xs mr-9 ">
                            Game mode:
                            <h1 className="font-bold">{post.GameMode?.name}</h1>
                          </div>
                          <p className="text-xs text-black mr-4">
                            Created:{" "}
                            {post.createdAt
                              .slice(0, 10)
                              .split("-")
                              .reverse()
                              .join("-")}
                          </p>
                        </div>
                      </div>
                      <div className="w-[100%]  p-4 flex flex-col items-start text-left">
                        {post.text}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="w-[40%] flex-col items-center">
          <motion.div
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            className="bg-gray-300 p-4 w-[59%] h-[8.8rem] rounded-[3rem] shadow-xl justify-center items-center mt-6 mx-[6.9rem]"
          >
            <h1 className="text-l font-bold text-black">Get verified</h1>
            <p className="text-s text-black">
              Subscribe to unlock new features
            </p>
            <Link to="/subscription">
          <motion.button
            className="bg-black text-white rounded-[6.9px] px-3 py-2 mt-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Subscribe
          </motion.button>
        </Link>
          </motion.div>

          <div className="flex flex-col items-center bg-gray-300 rounded-[3rem] w-[59%] justify-center mx-[6.9rem] mt-5 shadow-xl">
            <h1 className="text-l font-bold my-3 text-black">
              Favorite games:
            </h1>
            <div className="grid grid-cols-1 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  drag
                  dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  dragElastic={0.5}
                  onDragEnd={handleDragEnd}
                  className="w-[6.9rem] mb-1 rounded-lg"
                >
                  <img
                    src={image}
                    alt={`Favorite ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;