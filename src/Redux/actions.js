import { async } from "@firebase/util";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  GET_ALL_GAMES,
  GET_GAMES_BY_NAME,
  GET_GAME_BY_ID,
  POST_GAME,
  GET_POST_BY_USER_ID,
  DELETE_POST,
  GET_GAME_MODE,
  GET_GENRES,
  CREATE_USER,
  GET_USER_BY_ID,
  GET_USER_BY_NAME,
  GET_USER_BY_EMAIL,
  LOG_OUT,
  DELETE_USER,
  UPDATE_USER,
  GET_GAMES_WITH_PAGINATION,
  GET_ALL_POSTS,
  GET_POST_WITH_PAGINATION,
  GET_USERS_WITH_PAGINATION,
  CREATE_POST,
  ORDER,
  GET_ALL_USERS,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  DELETE_GAME,
  GET_ADMINS,
} from "./action-types";
import { ErrorMessage } from "formik";

export const getAllGames = () => {
  return async (dispatch) => {
    const games = await axios.get("https://llbcknd.onrender.com/games");
    dispatch({
      type: GET_ALL_GAMES,
      payload: games.data,
    });
  };
};

export const getGameById = (id) => async (dispatch) => {
  try {
    const gameId = await axios.get(`https://llbcknd.onrender.com/games/${id}`);
    return dispatch({
      type: GET_GAME_BY_ID,
      payload: gameId.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const getGamesWithPagination = (currentPage) => async (dispatch) => {
  try {
    const gamesPaginated = await axios.get(
      `https://llbcknd.onrender.com/games/page?page=${currentPage}`
    );
    return dispatch({
      type: GET_GAMES_WITH_PAGINATION,
      payload: gamesPaginated.data,
    });
  } catch (error) {
    return { error: error.message };
  }
};

export const getGamesByName = (name) => async (dispatch) => {
  try {
    const gameName = await axios(`https://llbcknd.onrender.com/games/name/${name}`);
    return dispatch({
      type: GET_GAMES_BY_NAME,
      payload: gameName.data,
    });
  } catch (error) {
    alert("Game does not exist!");
  }
};

export const postGames = (payload) => {
  return async (dispatch) => {
    try {
      let newGame = await axios.post("https://llbcknd.onrender.com/games", payload);
      console.log(newGame);
      return dispatch({
        type: POST_GAME,
        payload: newGame.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const getPostsByUserId = (id) => {
  return async (dispatch) => {
    try {
      let post = await axios.get(
        `https://llbcknd.onrender.com/games/posts/user/${id}`
      );
      return dispatch({
        type: GET_POST_BY_USER_ID,
        payload: post.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const getPostsWithPagination = (currentPage, gameid, gamemodeid) => {
  return async (dispatch) => {
    try {
      if (gameid && gamemodeid && +currentPage >= 1) {
        const postsPaginated = await axios.get(
          `https://llbcknd.onrender.com/posts/page?page=${currentPage}&gameid=${gameid}&gamemodeid=${gamemodeid}`
        );
        return dispatch({
          type: GET_POST_WITH_PAGINATION,
          payload: postsPaginated.data,
        });
      } else {
        const postsPaginated = await axios.get(
          `https://llbcknd.onrender.com/posts/page?page=${currentPage}`
        );
        return dispatch({
          type: GET_POST_WITH_PAGINATION,
          payload: postsPaginated.data,
        });
      }
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getUsersWithPagination = (currentPage) => {
  return async (dispatch) => {
    const userPaginated = await axios.get(
      `https://llbcknd.onrender.com/users/page/${currentPage}`
    );
    return dispatch({
      type: GET_USERS_WITH_PAGINATION,
      payload: userPaginated.data,
    });
  };
};

export const getAllPosts = () => {
  return async (dispatch) => {
    try {
      let allPosts = await axios.get("https://llbcknd.onrender.com/posts");
      return dispatch({
        type: GET_ALL_POSTS,
        payload: allPosts.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const deletePost = (payload) => {
  return async (dispatch) => {
    try {
      let newGame = await axios.delete("https://llbcknd.onrender.com/post", payload);
      return dispatch({
        type: DELETE_POST,
        payload: newGame.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const gameMode = () => {
  return async (dispatch) => {
    try {
      let newGame = await axios.get("https://llbcknd.onrender.com/games/mode");
      return dispatch({
        type: GET_GAME_MODE,
        payload: newGame.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const getGenres = () => {
  return async (dispatch) => {
    try {
      let genres = await axios.get("https://llbcknd.onrender.com/games/genres");
      return dispatch({
        type: GET_GENRES,
        payload: genres.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const createUser = (payload) => {
  const notifyError = (message) => toast.error(message);

  return async (dispatch) => {
    try {
      let newUser = await axios.post("https://llbcknd.onrender.com/register", payload);

      return dispatch({
        type: CREATE_USER,
        payload: newUser.data,
      });
    } catch (error) {
      notifyError("User already exists!");
    }
  };
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userToken = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const response = await axios(`https://llbcknd.onrender.com/users/${id}`, config);
    return dispatch({
      type: GET_USER_BY_ID,
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserByName = (name) => async (dispatch) => {
  try {
    const userName = await axios(`https://llbcknd.onrender.com/users/${name}`);
    return dispatch({
      type: GET_USER_BY_NAME,
      payload: userName.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserByEmail = (email) => async (dispatch) => {
  try {
    const userEmail = await axios.get(
      `https://llbcknd.onrender.com/users/email/${email}`
    );
    return dispatch({
      type: GET_USER_BY_EMAIL,
      payload: userEmail.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getAdminUsers = () => {
  return async (dispatch) => {
    try {
      const admins = await axios.get("https://llbcknd.onrender.com/users/admins");
      return dispatch({
        type: GET_ADMINS,
        payload: admins.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const logIn = (payload) => async (dispatch) => {
  try {
    const response = await axios.post("https://llbcknd.onrender.com/login", payload);
    const data = response.data;
    return dispatch({
      type: CREATE_USER,
      payload: data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    return dispatch({
      type: LOG_OUT,
      payload: {},
    });
  } catch (error) {
    throw new Error();
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const userId = await axios(`https://llbcknd.onrender.com/users/${id}`);
    return dispatch({
      type: DELETE_USER,
      payload: userId.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUser = (id, payload) => async (dispatch) => {
  try {
    const userId = await axios.put(
      `https://llbcknd.onrender.com/users/${id}`,
      payload
    );
    console.log(userId.data);
    return dispatch({
      type: UPDATE_USER,
      payload: userId.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const createPost = (payload) => {
  return async (dispatch) => {
    try {
      let newPost = await axios.post("https://llbcknd.onrender.com/posts", payload);
      let post = [newPost.data];
      return dispatch({
        type: CREATE_POST,
        payload: post,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const getFavorite = () => {
  return async (dispatch) => {
    try {
      const user = localStorage.getItem("user");
      const token = JSON.parse(user).token;
      const respuesta = await axios.get(
        `https://llbcknd.onrender.com/favorite/${token}`
      );
      const data = respuesta.data;
      console.log(data);
      return dispatch({ type: ADD_FAVORITE, payload: data });
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const deleteFavorite = (id) => {
  return { type: DELETE_FAVORITE, payload: id };
};

export const orderPostByCreation = (posts) => {
  return { type: ORDER, payload: posts };
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // Obtén el token almacenado en el local storage o en otra fuente segura
    const userToken = user.token;
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`, // Incluye el token en el encabezado de la solicitud
      },
    };
    const response = await axios.get("https://llbcknd.onrender.com/users", config);
    return dispatch({
      type: GET_ALL_USERS,
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteGame = (id) => {
  return async (dispatch) => {
    try {
      const gameId = await axios.delete(`https://llbcknd.onrender.com/games/${id}`);
      return dispatch({
        type: DELETE_GAME,
        payload: gameId.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const getGameModes = () => {
  return async (dispatch) => {
    try {
      let newGame = await axios.get("https://llbcknd.onrender.com/games/mode");
      return dispatch({
        type: GET_GAME_MODE,
        payload: newGame.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};
