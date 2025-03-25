import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, setSelectedUser } from "../../features/users/usersSlice";
import styles from "./UserList.module.css";
import { User } from "../../types/User";

export const UserList: FC = () => {
  const users = useSelector((state) => state.users.list);
  const dispatch = useDispatch();
  const updateStatus = useSelector((state) => state.users.updateStatus);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, updateStatus]);

  return (
    <div className={styles.container}>
      <ul className={styles.userList}>
        {users.map((user: User) => (
          <li
            className={styles.userListItem}
            onClick={() => dispatch(setSelectedUser(user))}
            key={user.id}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
