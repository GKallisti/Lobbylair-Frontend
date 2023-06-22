import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const SendEmail = () => {
  const handleSendEmail = async (values) => {
    const { email } = values;
    try {
      await axios.post("http://localhost:3001/sendEmail", { email });
    } catch (error) {
      alert(error.response.data.message || "Error al enviar el email");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 pt-9 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full mx-auto p-6 bg-white border border-gray-300 shadow-md rounded-md">
        <Formik
          initialValues={{
            email: "",
          }}
          validate={(values) => {
            const errors = {};

            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Formato de correo electrónico inválido";
            }

            return errors;
          }}
          onSubmit={handleSendEmail}
        >
          <Form>
            <div className="mb-8">
              <label
                htmlFor="email"
                className="mb-4 text-sm font-bold text-gray-800"
              >
                Tu correo electrónico
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="nombre@empresa.com"
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg"
                required
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white border-none rounded-lg p-4 text-lg font-bold cursor-pointer hover:bg-blue-700"
            >
              Enviar correo electrónico
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default SendEmail;
