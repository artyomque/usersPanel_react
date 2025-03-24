import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../../features/users/usersSlice";
import styles from "./UserList.module.css";
import { User } from "../../types/User";

export const UserList: FC = () => {
  const users = useSelector((state) => state.users.list);
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <ul className={styles.userList}>
        {users.map((user: User) => (
          <li
            className={styles.userListItem}
            onClick={() => dispatch(setSelectedUser(user))}
            key={user.id}
          >
            {user.name.length > 23 ? user.name.slice(0, 23) + "..." : user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
