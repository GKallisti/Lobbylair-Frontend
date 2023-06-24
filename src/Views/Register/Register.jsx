import { useState } from "react";
import { createUser } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LobbyLogo from "../../Multimedia/Logo Lobbylair.gif";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
   const notifyError = (message) => toast.error(message);
   const notify = (message) => toast.success(message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const validateUser = await dispatch(createUser(data)); // Esperar a que se resuelva la promesa
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

  return (
    <section className="min-h-screen bg-gray-100 pt-9 flex flex-col items-center justify-center">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          height: "100vh",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#111827",
          }}
        >
          <img src={LobbyLogo} alt="LOBBYL" className="w-20 h-auto mt-4" />
        </a>
        <div
          style={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: "0.375rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            maxWidth: "20rem",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              padding: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <h1 className="text-xl font-bold mb-4 text-gray-800"
            >
              Create an account
            </h1>
            <form onSubmit={handleRegister} style={{ marginTop: "1.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
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
                  className="w-full p-2 border border-gray-300 rounded-[5rem]"
                  placeholder="name"
                  required
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  value={data.name}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
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
                  className="w-full p-2 border border-gray-300 rounded-[5rem]"
                  placeholder="name@company.com"
                  required
                  onChange={handleInputChange}
                  value={data.email}
                />
                {errors.email && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="password"
                  className="mb-1 text-sm font-bold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded-[5rem]"
                  placeholder="••••••••"
                  required
                  onChange={handleInputChange}
                  value={data.password}
                />
                {errors.password && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.password}
                  </p>
                )}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  htmlFor="confirm-password"
                  className="mb-1 text-sm font-bold text-gray-800"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  className="w-full p-2 border border-gray-300 rounded-[5rem]"
                  placeholder="••••••••"
                  required
                  onChange={handleInputChange}
                  value={data.confirmPassword}
                />
                {errors.confirmPassword && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isFormValid()}
                className="w-full bg-black text-white border-none rounded-[5rem] p-3 text-l font-bold cursor-pointer"
              >
                Create an account
              </button>

              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "0.875rem",
                  fontWeight: "light",
                  color: "#6b7280",
                }}
              >
                Already have an account?{" "}
                <a
                  className="font-bold text-black"
                  href="/"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register;
