import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsersWithPagination } from "../../Redux/actions";
import { ToastContainer } from "react-toastify";

const DeleteUser = ({ afterDelete }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); 

  useEffect(() => {
    dispatch(getUsersWithPagination(currentPage));
  }, [currentPage, dispatch]);
  const pagedUsers = useSelector((state) => state.pageUsers);

  const inPageUsers = pagedUsers.users;

  const currentUser = useSelector((state) => state.user);

  const handleNext = () => {
    if (currentPage !== pagedUsers.totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    } else {
      setCurrentPage(1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const nextPage = currentPage - 1;
      setCurrentPage(nextPage);
    } else {
      const maxPage = pagedUsers.totalPages;
      setCurrentPage(maxPage);
    }
  };

  const handleDeleteUser = (userid) => {
    afterDelete();
    dispatch(deleteUser(userid));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {pagedUsers.totalPages > 1 && (
          <div className="bg-gray-300 rounded p-3 shadow-3xl border-l-black">
            <button onClick={handlePrev} className="mt-2 text-red-700">
              {"<"}
            </button>
            <button onClick={handleNext} className="mt-2 text-red-700">
              {">"}
            </button>
          </div>
        )}
        {inPageUsers?.map((user) => {
          return (
            <div key={user.id}>
              <div className="bg-gray-300 rounded p-4 shadow-3xl border-l-black">
                <label htmlFor="name" className="block text-black">
                  {user.name}
                </label>
                {user.id !== currentUser.id && (
                  <button onClick={() => handleDeleteUser(user.id)} className="mt-2 text-red-700">
                    Delete User
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </>
  );  
};

export default DeleteUser;
