// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, NavLink } from 'react-router-dom';
// import queryString from 'query-string';
// import { useDispatch, useSelector } from "react-redux";
// import GamesBar from "../GamesBar/GamesBar";
// import { getPostsWithPagination, createPost } from "../../Redux/actions";
// import { HiHeart } from "react-icons/hi";
// import Loader from "../Loader/Loader";

// const GamePosts = () => {
//   const location = useLocation();
//   const { gameId, gameModeId } = queryString.parse(location.search);
//   const dispatch = useDispatch()
//   const navigate=useNavigate()
//   const stateUser = useSelector((state) => state.user);

// //------------------esto es para el form------------------------------//
//   const [userId, setUserId] = useState(stateUser.id);
//   const [text, setText] = useState("");
//   const [gameid, setGameid] = useState(gameId);
//   const [gamemodeid, setGamemodeid] = useState(gameModeId);
//   const [refresh, setRefresh] = useState(false);
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await dispatch(createPost({ text, userid: userId, gameid, gamemodeid, name: stateUser.name }))
//       setRefresh(!refresh)
//       if (response) {
//         console.log("El post se creó exitosamente");
//       } else {
//         console.error("Error al crear el post");
//       }
//     } catch (error) {
//       console.error("Error al realizar la solicitud:", error);
//     }
//     setText("");
//   };

// const [currentPage, setCurrentPage]=useState(1)
// const [btnNext, setBtnNext]=useState(false)
// const [btnPrev, setBtnPrev]=useState(true)
// const [loading, setLoading]=useState(true)

// const post=useSelector(state=>state.pagePosts)
// const pagedPosts=post.posts

// useEffect(()=>{
//   setLoading(true)
//   dispatch(getPostsWithPagination(currentPage, gameid, gamemodeid))
//   .then(()=>setLoading(false))
// }, [currentPage, dispatch, refresh])

// useEffect(()=>{
//   if(currentPage === 1){
//     setBtnNext(true);
//     setBtnPrev(false)
// }else if(currentPage === +post.totalPages){
//     setBtnNext(true)
//     setBtnPrev(false)
// }else{
//     setBtnNext(false)
//     setBtnPrev(false)
// }
// })

// const pages=Array.from({ length: post.totalPages }, (_, index) => index + 1)

// const handleOnClick= (event)=>{
//   const selectedPage=parseInt(event.target.value)
//   if(selectedPage !== currentPage){
//       setCurrentPage(selectedPage)

//   }
// }
// const handleNext = (event)=>{
//   if(currentPage !== post.totalPages){
//     const nextPage=currentPage+1;
//     setCurrentPage(nextPage)
//   }
// }

// const handlePrev = ()=>{
//   if(currentPage>1){
//     const prevPage=currentPage-1;
//     setCurrentPage(prevPage)
//   }
// }
// //--------------------------------------reacciones---------------------------------
// const [liked, setLiked]= useState(false)

// const handleLike= (event)=>{
//   setLiked(!liked)
// }
//   return (
//     <div className="flex ml-[15rem] my-[5rem]">
//       <GamesBar/>
//       <div>
//       <form style={{marginTop:'0.75em'}} onSubmit={handleSubmit}>
//         <input
//            className="items-center justify-center w-[350px] h-[50px] mx-auto my-[5rem] bg-gray-300 rounded-lg p-3 mt-[5rem] ml-[10rem] overflow-wrap-break-word"
//         style={{
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.25)",
//         }}
//           type="text"
//           value={text}
//           onChange={(event) => setText(event.target.value)}
//           placeholder="Ingrese el texto del post"
//         />
//         <button className="m-2 bg-black text-white border-none rounded-[5rem] p-3 text-l font-bold cursor-pointer" type="submit">Crear Post</button>
//       </form>
//       <button onClick={handlePrev} disable={btnPrev} className="bg-black text-white border-none rounded-[5rem] p-3 text-l font-bold cursor-pointer m-2"> Prev </button>

//       {post.totalPages > 1 && pages?.map(e=><button style={{marginLeft:'5px', marginRight:'5px'}} key={e} value={e} onClick={handleOnClick} disabled={currentPage===e}>{e}</button>)}
//       <button onClick={handleNext} disable={btnNext} className="bg-black text-white border-none rounded-[5rem] p-3 text-l font-bold cursor-pointer m-2"> Next </button>
//       <div className="p-2">
//       {loading && <Loader/>}
//       {pagedPosts?.map(({ id, createdAt, text, User }) => {
//         if (User) {
//           return (
//           <div key={id} className="items-center justify-center w-[300px] h-[110px] mx-auto my-[5rem] bg-gray-300 rounded-lg p-3 ml-[10rem]"
//         style={{
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.25)",
//         }}>
//         <h1 className="text-black font-bold">{text}</h1>
//         <p className="text-black font-bold">Posted by:</p>
//         <NavLink to={`/profile/${User.id}`}>
//           <p className="text-black font-bold">{User.name}</p>
//         </NavLink>

//             <div style={{display:'flex', marginLeft:'33%'}}>
//               {liked  === true ? (<HiHeart onClick={handleLike} style={{cursor:'pointer', color:'crimson'}} />) : ( <HiHeart onClick={handleLike} style={{cursor:'pointer'}} />)}

//             <p style={{marginLeft:'1em'}}>Created: {createdAt.slice(0, 10).split('-').reverse().join('-')}</p>

//             </div>
//       </div>
//     )
//   } else {
//     return null; // O puedes mostrar un mensaje de error
//   }
// })}
//       </div>
//       </div>
//     </div>
//   );
// };

// export default GamePosts;

import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { getPostsWithPagination, createPost } from "../../Redux/actions";
import { HiHeart } from "react-icons/hi";
import Loader from "../Loader/Loader";

const GamePosts = () => {
  const location = useLocation();
  const { gameId, gameModeId } = queryString.parse(location.search);
  const dispatch = useDispatch();
  const stateUser = useSelector((state) => state.user);

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
    dispatch(getPostsWithPagination(currentPage, gameid, gamemodeid)).then(() => {
      setLoading(false);
      console.log("Posts obtenidos:", pagedPosts);
    });
  }, [currentPage, dispatch, refresh]);
  
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
  const [liked, setLiked] = useState(false);

  const handleLike = (event) => {
    setLiked(!liked);
  };

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
                placeholder="Ingrese el texto del post"
              />
              <button
                className="ml-2 bg-black text-white border-none rounded-full px-4 py-2 text-lg font-bold cursor-pointer"
                type="submit"
              >
                Create Post
              </button>
            </form>
          </div>

          <button
            onClick={handlePrev}
            disabled={btnPrev}
            className="bg-black text-white border-none rounded-[5rem] p-3 text-l font-bold cursor-pointer m-2 text-sm"
          >
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
                disabled={currentPage === e}
              >
                {e}
              </button>
            ))}
          <button
            onClick={handleNext}
            disabled={btnNext}
            className="bg-black text-white border-none rounded-[5rem] p-3 text-l font-bold cursor-pointer m-2 text-sm"
          >
            {" "}
            Next{" "}
          </button>

          <div className="p-2">
            {loading && <Loader />}
            {pagedPosts?.map(({ id, createdAt, text, User }) => {
              if (User) {
                return (
                  <div
                    key={id}
                    className="w-[80%] mx-auto border-2 border-crimson p-8 flex justify-between items-start mb-3"
                    style={{
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div className="flex items-start ">
                      <p className=" font-bold">Posted by:</p>
                      <NavLink to={`/profile/${User.id}`}>
                        <p className=" font-bold ml-2">{User.name}</p>
                      </NavLink>
                    </div>

                    <div className="flex items-center justify-center w-1/3">
                      <h1 className=" font-bold">{text}</h1>
                    </div>

                    <div className="flex items-start justify-end w-1/3">
                      <div style={{ display: "flex" }}>
                        {liked === true ? (
                          <HiHeart
                            onClick={handleLike}
                            style={{ cursor: "pointer", color: "crimson" }}
                          />
                        ) : (
                          <HiHeart
                            onClick={handleLike}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                        <p style={{ marginLeft: "1em" }}>
                          Created:{" "}
                          {createdAt
                            .slice(0, 10)
                            .split("-")
                            .reverse()
                            .join("-")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null; // O puedes mostrar un mensaje de error
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePosts;
