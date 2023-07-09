import React, { useEffect, useState } from "react";
import axios from "axios";
import { TiDelete } from 'react-icons/ti';
import { Formik, Form, Field, ErrorMessage } from "formik";

const Response = ({ postId, userId }) => {
  const [responses, setResponses] = useState([]);
  const [showAllResponses, setShowAllResponses] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [sortedResponses, setSortedResponses] = useState([]);

  useEffect(() => {
    fetchResponses();
  }, [postId]);

  useEffect(() => {
    sortResponses();
  }, [responses, sortBy]);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(`https://bckndll.onrender.com/response/${postId}`);
      setResponses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sortResponses = () => {
    let sorted = [...responses];
    if (sortBy === "recent") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    setSortedResponses(sorted);
  };

  const handleCreateResponse = async (values, { resetForm }) => {
    try {
      const newResponse = {
        text: values.responseText,
        PostId: postId,
        userId: userId,
      };

      await axios.post("https://bckndll.onrender.com/response", newResponse);
      resetForm();
      fetchResponses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteResponse = async (responseId) => {
    try {
      await axios.delete(`https://bckndll.onrender.com/response/${responseId}`);
      fetchResponses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredResponses = showAllResponses ? sortedResponses : sortedResponses.slice(0, 5);

  return (
    <Formik
      initialValues={{ responseText: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.responseText.trim()) {
          errors.responseText = "Response cannot be empty";
        }
        return errors;
      }}
      onSubmit={handleCreateResponse}
    >
      {({ isValid, isSubmitting, resetForm }) => (
        <Form className="border-2 w-[80%] items-center mx-auto">
          <div className="response-input justify-center items-center">
            <Field
              className="w-[60%] h-[2rem]   border-2 rounded-full border-gray-350"
              type="text"
              name="responseText"
              placeholder="Write a response..."
            />
            <ErrorMessage name="responseText" component="div" className="text-xs text-red-500" />
            <button
              className="rounded-lg bg-slate-800 text-white w-[4rem] mt-2 mx-3 h-[2rem]"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Send
            </button>
          </div>
          <div className="mt-2">
            <div>
              {responses.length > 0 && (
                <div className="filter-options">
                  <label className="filter-label text-xs font-bold">
                    <Field
                      type="radio"
                      name="filter"
                      value="recent"
                      checked={sortBy === "recent"}
                      onChange={handleFilterChange}
                      className="ml-2 me-1 text-xs"
                    />
                    Most Recent
                  </label>
                  <label className="filter-label text-xs font-bold">
                    <Field
                      type="radio"
                      name="filter"
                      value="oldest"
                      checked={sortBy === "oldest"}
                      onChange={handleFilterChange}
                      className="ml-2 me-1"
                    />
                    Oldest
                  </label>
                </div>
              )}
              {filteredResponses.map((response) => (
                <div key={response.id} className="flex w-[5%] mx-auto justify-center items-center w-[45%] border-2 rounded-full border-gray-350">
                  <p className="w-[60%] text-s ">{response.text}</p>
                  <div className="w-[20%] flex justify-end items-center ">
                    <p className="mr-2 "> {response.userId === userId ? "You" : response.userId}</p>
                    <button className="justify-end" onClick={() => handleDeleteResponse(response.id)}>
                      <TiDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {responses.length > 5 && (
            <div className="mt-2">
              {showAllResponses ? (
                <button className="text-xs font-bold" onClick={() => setShowAllResponses(false)}>Show Less Responses</button>
              ) : (
                <button className="text-xs font-bold" onClick={() => setShowAllResponses(true)}>Show All Responses</button>
              )}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default Response;

