import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers, updateUser } from "../../Redux/actions";
import axios from "axios";

const DeleteAdmin = ({ afterDeleteAdmin }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminUsers());
  }, [dispatch]);

  const adminUsers = useSelector((state) => state.admins);

  const handleDeleteAdmin = async (adminId) => {
    const adminToUpdate = adminUsers.find((admin) => admin.id === adminId);
    if (adminToUpdate) {
      const updatedAdmin = {
        ...adminToUpdate,
        isAdmin: false,
      };
      await axios.put(`https://llbcknd.onrender.com/users/${adminId}`, {
        isAdmin: "false",
      });
      console.log(adminId);
      afterDeleteAdmin();
    }
  };

  return (
    <div>
      {adminUsers.map((admin) => {
        return (
          <div key={admin.id}>
            <label htmlFor="Name">{admin.name}</label>{" "}
            <button onClick={() => handleDeleteAdmin(admin.id)}>
      
              Delete admin
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DeleteAdmin;
