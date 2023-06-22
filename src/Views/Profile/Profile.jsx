import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../Redux/actions";
import UpdateProfile from "../UpdateProfile/UpdateProfile";


const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const pathname = location.pathname;
    const id = pathname.split("/").filter((str) => !isNaN(parseInt(str)))[0];
    dispatch(getUserById(id));
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setShowImage(false);
  };

  const renderProfile = () => {
    return (
      <div className="flex">
        <div className="w-3/4 pr-5">
          <div className="bg-gray-300 rounded-lg min-h-[20rem]" style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.25)" }}>
            <div className="">
              <img src="https://source.unsplash.com/120x120/?person" alt="" className="w-1/4 rounded-full cursor-pointer p-5" />
              <div className="flex flex-col space-y-2 w-full">
                <div className="">
                  <h3 className="text-4xl font-bold text-left m-2 p-3 truncate border-b border-black w-2/2 text-black">
                    {userDetail.name}
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-2">
                  <div className="m-4 space-x-2 pl-10">
                    <h1 className="text-black font-bold truncate">E-mail:</h1>
                    <h1 className="text-black truncate">{userDetail.email}</h1>
                  </div>
                  <div className="m-4 space-x-2 pl-10">
                    <h1 className="text-black font-bold truncate">Fecha de creación:</h1>
                    <h1 className="text-black truncate">
                      {userDetail.createdAt.slice(0, 10).split("-").reverse().join("-")}
                    </h1>
                  </div>
                  <div className="m-4 space-x-2 pl-10">
                    <h1 className="text-black font-bold truncate">Profile Url:</h1>
                    <h1 className="text-black truncate">
                      {userDetail.perfilUrl !== "" ? userDetail.perfilUrl : "You can put a steam profile url or similar"}
                    </h1>
                  </div>
                  <div className="m-4 space-x-2 pl-10">
                    <h1 className="text-black font-bold truncate">Descripción:</h1>
                    <h1 className="text-black truncate">{userDetail.Descripción}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4 sm:ml-[5rem]">
              <button
                className="bg-black text-white border-none rounded-[5rem] p-3 text-l font-bold cursor-pointer"
                onClick={handleEditClick}
              >
                Editar
              </button>
            </div>
          </div>
        </div>
        <div className="w-9/20">
          {showImage && 
          <div 
          className="text-center bg-gray-300 rounded-lg min-h-[29rem]" 
          style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.25)" }}> 
            Aquí no sé si agregaremos una imagen, publicidad o que carajo
          </div>
          }
          {editMode && !showImage && <UpdateProfile />}
        </div>
      </div>
    );
  };

  return <div className="m-10">{renderProfile()}</div>;
};

export default Profile;

