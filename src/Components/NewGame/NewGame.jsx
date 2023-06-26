import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getGameModes, postGames } from "../../Redux/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewGame = ({ handleOnNewGame }) => {
  const dispatch = useDispatch();
  const notify = (message) => toast.success(message);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Game Name is required")
      .matches(/^[a-zA-Z0-9\s]+$/, "Invalid Game Name"),
    thumbnail: Yup.string().required("Thumbnail URL is required").url("Invalid Thumbnail URL"),

    genres: Yup.array().required("At least one Genre is required"),
    
    gameModes: Yup.array().required("At least one Game Mode is required"),
  });

  const handleOnSubmit = (values) => {
    dispatch(postGames(values));
    notify("New game added");
    handleOnNewGame();
  };

  React.useEffect(() => {
    dispatch(getGenres());
    dispatch(getGameModes());
  }, []);

  const allGenres = useSelector((state) => state.genre);
  const allGameModes = useSelector((state) => state.gameMode);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          thumbnail: "",
          genres: [],
          gameModes: [],
        }}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form key="New Game Form" onSubmit={formik.handleSubmit}>
            <label className="mb-1 text-sm font-bold text-gray-800" htmlFor="name">
              Game Name
            </label>
            <Field
              type="text"
              placeholder="Introduce a game name"
              name="name"
              className="p-2 m-2 border border-gray-300 rounded-[1rem]"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            <hr />

            <label className="mb-2 text-sm font-bold text-gray-800" htmlFor="thumbnail">
              Thumbnail
            </label>
            <Field
              type="text"
              className="p-2 m-2 border border-gray-300 rounded-[1rem]"
              placeholder="Introduce an Url"
              name="thumbnail"
            />
            <ErrorMessage name="thumbnail" component="div" className="text-red-500 text-sm" />
            <hr />

            <label className="mb-2  text-sm font-bold text-gray-800" htmlFor="gameModes">
              Game Modes
            </label>
            <div className="flex flex-row place-content-center my-3">
              {allGameModes.map((gameMode) => (
                <div key={gameMode.id}>
                  <ul>
                    <li>
                      <Field
                        type="checkbox"
                        name="gameModes"
                        value={gameMode.name}
                        className="p-1 m-1 my-3  border border-gray-300 rounded-[1rem]"
                      />
                      <label className="m-1 text-sm font-bold text-gray-800" htmlFor={gameMode.name}>
                        {gameMode.name}
                      </label>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <ErrorMessage name="gameModes" component="div" className="text-red-500 text-sm" />
            <hr />

            <label className="mb-1 text-sm my-3 font-bold text-gray-800" htmlFor="genres">
              Genres
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
              {allGenres.map((genre) => (
                <div key={genre.id}>
                  <ul>
                    <li>
                      <Field
                        type="checkbox"
                        name="genres"
                        value={genre.name}
                        className="p-1 m-1 border border-gray-300 rounded-[1rem]"
                      />
                      <label className="m-1 text-sm font-bold text-gray-800" htmlFor={genre.name}>
                        {genre.name}
                      </label>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <ErrorMessage name="genres" component="div" className="text-red-500 text-sm" />
            <hr />

            <button
              className="m-4 py-2 px-3 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
              type="submit"
              disabled={!formik.isValid}
            >
              New Game
            </button>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default NewGame;