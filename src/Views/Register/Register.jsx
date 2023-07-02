import React, { useState } from "react";
import { createUser } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LobbyLogo from "../../Multimedia/Logo Lobbylair.gif";
import { ToastContainer, toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const notifyError = (message) => toast.error(message);
  const notify = (message) => toast.success(message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    image: "gs://lobbylair-pf.appspot.com/Logo.webp",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const validateUser = await dispatch(createUser(data));
      console.log(validateUser);
      if (validateUser) {
        notify("User created successfully, Login to continue");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      notifyError(error);
    }
  };

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      confirmPassword: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: validateField("confirmPassword", value),
    }));
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "email":
        if (!emailRegex.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "password":
        if (!passwordRegex.test(value)) {
          error =
            "Password must contain at least one uppercase letter and one special character (!@#$%^&*), and be at least 6 characters long";
        }
        break;
      case "confirmPassword":
        if (value !== data.password) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const isFormValid = () => {
    return (
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
      data.email &&
      data.password &&
      data.confirmPassword &&
      data.name
    );
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="flex flex-col lg:flex-row text-black bg-gray-100 h-screen">
      <div className="lg:w-3/5">
        <img
          src="https://i.pinimg.com/originals/3f/30/0e/3f300e31f8c0b4754638f30dce4d75d9.jpg"
          alt="img-register"
          className="h-full w-3/4 object-cover object-right rounded-r-3xl"
        />
      </div>
      <div className="flex flex-col items-center justify-center p-2 h-full">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-bold text-black"
        >
          <img
            src={LobbyLogo}
            alt="LOBBYL"
            className="w-20 h-auto mt-2"
          />
        </a>
        <div className="w-full bg-white rounded-lg shadow-lg max-w-sm p-6">
          <div className=" mb-2">
            <h1 className="text-xl font-bold mb-4 text-gray-800">
              Create an account
            </h1>
            <form onSubmit={handleRegister} className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="mb-1 text-sm font-bold text-gray-800"
                >
                  Your name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="w-full p-2 border border-gray-300 rounded-full"
                  placeholder="name"
                  required
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  }
                  value={data.name}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-1 text-sm font-bold text-gray-800"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-full"
                  placeholder="name@company.com"
                  required
                  onChange={handleInputChange}
                  value={data.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="mb-1 text-sm font-bold text-gray-800"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded-full"
                    placeholder="••••••••"
                    required
                    onChange={handleInputChange}
                    value={data.password}
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirm-password"
                  className="mb-1 text-sm font-bold text-gray-800"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirm-password"
                    className="w-full p-2 border border-gray-300 rounded-full"
                    placeholder="••••••••"
                    required
                    onChange={handleConfirmPasswordChange}
                    value={data.confirmPassword}
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={!isFormValid()}
                className="w-full py-2 rounded-full bg-gray-800 text-white font-bold focus:outline-none focus:shadow-outline hover:bg-gray-700"
              >
                Create Account
              </button>
            </form>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </section>
  );
};

export default Register;