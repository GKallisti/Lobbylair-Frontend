import { useState } from "react";
import AddAdmin from "../../Components/Add Admin/AddAdmin";
import DeleteAdmin from "../../Components/Delete Admin/Delete Admin";
import 'react-toastify/dist/ReactToastify.css';

const SettingsDashboard = () => {
  const [showM, setShowM] = useState(false);
  const [showA, setShowA] = useState(false);

  const handleAddAdmin = () => {
    setShowM(true);
    setShowA(false);
  };

  const handleAddedAdmin = () => {
    setShowM(false);
  };

  const handleDeleteAdmin = () => {
    setShowA(true);
    setShowM(false);
  };

  const afterDeleteAdmin = () => {
    setShowA(false);
  };

  return (
    <div className="w-[100%]  justify-center items-center">
      <div className="flex mt-20 mx-auto bg-gray-200  flex-col w-[90%] items-center rounded-[2rem] justify-center shadow-2xl">
        <div className="mb-4 justify-center">
          <h1 className="text-xl font-bold mb-2 my-8 text-gray-800 text-center">
            Dashboard Admin
          </h1>
        </div>
        <div className="flex p-2 my-2">
          <button
            className="flex justify-center m-1 py-2 px-6 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            value="Mod Admin"
            onClick={handleAddAdmin}
          >
            Add Admin
          </button>
          <button
            className="flex justify-center m-1 py-2 px-4 border border-transparent hover:text-black rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            value="Del User"
            onClick={handleDeleteAdmin}
          >
            Delete an admin
          </button>
        </div>
        <div>
          {showM && !showA && (
            <div>
              <button
                className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800"
                onClick={() => setShowM(false)}
              >
                Cancel
              </button>
              <AddAdmin handleAddedAdmin={handleAddedAdmin} />
            </div>
          )}
        </div>
        <div>
          {!showM && showA && (
            <div>
              <button
                className="m-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800"
                onClick={() => setShowA(false)}
              >
                Cancel
              </button>
              <DeleteAdmin afterDeleteAdmin={afterDeleteAdmin} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
