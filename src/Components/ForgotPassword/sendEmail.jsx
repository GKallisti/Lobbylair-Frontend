import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

const SendEmail = () => {
  const handleSendEmail = async (values) => {
    const { email } = values;
    try {
      await axios.post("https://llbcknd.onrender.com/sendEmail", { email });
    } catch (error) {
      alert(error.response.data.message || "Error sending email");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="flex mx-auto bg-gray-200 flex-col w-[90%] max-w-md mx-auto p-10 border bg-gray-200 rounded-md">
        <Formik
          initialValues={{
            email: "",
          }}
          validate={(values) => {
            const errors = {};

            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email format";
            }

            return errors;
          }}
          onSubmit={handleSendEmail}
        >
          <Form >
            <div className="mb-10">
              <label
                htmlFor="email"
                className="text-2xl font-bold mb-10"
              >
                Send E-mail
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="nombre@empresa.com"
                className="w-full p-2 mt-5 border border-gray-300 rounded-[5rem]"
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
              className="w-full flex justify-center py-2 border border-transparent p-4 hover:text-black rounded-[5rem] shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring-2"
            >
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default SendEmail;
