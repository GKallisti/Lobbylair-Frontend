import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleReset = async (values) => {
    const { newPassword } = values;
    try {
      await axios.post("https://llbcknd.onrender.com/resetPassword", {
        token,
        newPassword,
      });
      navigate("/");
    } catch (error) {
      alert(
        error.response.data.message || "Failed to reset password"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex mx-auto bg-gray-200 flex-col w-[90%] max-w-md mx-auto p-10 border bg-gray-200 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Restore Your Password</h1>
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.newPassword) {
              errors.newPassword = "Campo requerido";
            }

            if (values.newPassword.length < 8) {
              errors.newPassword =
                "Password must contain at least 8 characters";
            }

            if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(values.newPassword)) {
              errors.newPassword =
                "Password must contain at least one uppercase letter and one symbol";
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = "Required field";
            }

            if (values.confirmPassword !== values.newPassword) {
              errors.confirmPassword = "Passwords do not match";
            }

            return errors;
          }}
          onSubmit={handleReset}
        >
          <Form>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="mb-1 text-sm font-bold text-gray-800"
              >
                New password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  className="mt-1 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-[5rem] bg-gray-100 px-3 py-2"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="mb-1 text-sm font-bold text-gray-800"
              >
                Confirm password
              </label>
              <div className="relative">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="mt-1 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-[5rem] bg-gray-100 px-3 py-2"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                  />
                </span>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 border border-transparent hover:text-black rounded-[5rem] shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring-2"
            >
              Reset password
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;