import { useState } from "react";
import DeleteUser from "../../Components/DeleteUser/DeleteUser";

import 'react-toastify/dist/ReactToastify.css';

const UsersDashboard = () => {
  const [showU, setShowU] = useState(false);

  const handleDeleteUser = () => {
    setShowU(true);
  };

  const afterDelete = () => {
    setShowU(false);
  };

  return (
    <div className="w-[100%] justify-center items-center">
      <div className="flex mt-20 mx-auto bg-gray-200 flex-col w-[90%] items-center rounded-[2rem] justify-center shadow-2xl">
        <div className="mb-4 justify-center">
          <h1 className="text-xl font-bold mb-4 my-8 text-gray-800 text-center">
            Dashboard Admin
          </h1>
        </div>
        <div className="flex p-2 my-5">
          <button
            className="flex justify-center m-1 py-2 px-4 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            value="Del User"
            onClick={handleDeleteUser}
          >
            Delete an User
          </button>
        </div>
        <div>
          {showU && (
            <div>
              <button
                className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800"
                onClick={() => setShowU(false)}
              >
                Cancel
              </button>
              <DeleteUser afterDelete={afterDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
