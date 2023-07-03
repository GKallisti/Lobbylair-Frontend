import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const { email } = values;
      const res = await axios(`https://bckndll.onrender.com/users/email/${email}`);
      const user = res.data;

      if (user.length === 0) {
        notify("User successfully added as admin");
        resetForm();
        return;
      }
      const userId = user.id;
      try {
        await axios.put(`https://bckndll.onrender.com/users/${userId}`, {
          isAdmin: true,
        });
        resetForm();
      } catch (error) {
        notifyError(error.message);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center"
      >
        <div className="flex items-center bg-gray-50 rounded-[3rem] my-5 border-cyan-950 py-3">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mx-8 py-1 leading-tight focus:outline-none"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm text-center mt-1">
            {formik.errors.email}
          </div>
        )}
        <div className="mt-3">
          <button
            type="submit"
            className="bg-gray-800 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddAdmin;
