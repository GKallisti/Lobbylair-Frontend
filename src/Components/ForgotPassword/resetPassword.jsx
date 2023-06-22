import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (values) => {
    const { newPassword } = values;
    try {
      await axios.post("http://localhost:3001/resetPassword", {
        token,
        newPassword,
      });
      navigate("/");
    } catch (error) {
      alert(
        error.response.data.message || "Error al restablecer la contraseña"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full mx-auto p-6 border border-gray-300 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Restablecer contraseña</h1>
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.newPassword) {
              errors.newPassword = "Campo requerido";
            }

            if (values.newPassword.length < 8) {
              errors.newPassword =
                "La contraseña debe tener al menos 8 caracteres";
            }

            if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(values.password)) {
              errors.password =
                "Password must contain at least one uppercase letter and one symbol";
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = "Campo requerido";
            }

            if (values.confirmPassword !== values.newPassword) {
              errors.confirmPassword = "Las contraseñas no coinciden";
            }

            return errors;
          }}
          onSubmit={handleReset}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Nueva contraseña
              </label>
              <Field
                type="password"
                name="newPassword"
                id="newPassword"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 px-3 py-2"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar contraseña
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-100 px-3 py-2"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Restablecer contraseña
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
