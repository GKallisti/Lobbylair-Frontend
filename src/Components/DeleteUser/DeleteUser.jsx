import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsersWithPagination } from "../../Redux/actions";

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
    <div>
      {pagedUsers.totalPages > 1 && (
        <div>
          <button onClick={handlePrev}>{"<"}</button>
          <button onClick={handleNext}>{">"}</button>
        </div>
      )}
      {inPageUsers?.map((user) => {
        return (
          <div key={user.id}>
            <label htmlFor="name">{user.name}</label>
            {user.id !== currentUser.id && (
              <button onClick={() => handleDeleteUser(user.id)}>
                Delete User
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DeleteUser;
