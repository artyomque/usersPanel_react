import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../../features/users/usersSlice";
import styles from "./UserCard.module.css";

interface Props {
  className?: string;
}

export const UserCard: FC<Props> = () => {
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const updatedUser = { ...selectedUser, [field]: e.target.value };
    dispatch(setSelectedUser(updatedUser));
  };

  const handleSubmit = () => {
    console.log("Отправили обновленные данные пользователя на сервер:", selectedUser);
  };

  if (!selectedUser) {
    return <>Пользователь не выбран</>;
  }

  return (
    <>
      <div className={styles.userCard}>
        <div className={styles.userCardHeader}>
          <div>
            <input
              id="name"
              className={styles.userDetailsItemInput}
              value={selectedUser.name || "Не указано"}
              type="text"
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
        </div>

        <div className={styles.userCardContent}>
          <div className={styles.avatarSection}>
            <img className={styles.avatar} src="default_profile.svg" />
            <div className={styles.statusIndicator}></div>
          </div>

          <div className={styles.userDetails}>
            <ul>
              <li className={styles.userDetailsItem}>
                <label htmlFor="jobTitle">Должность</label>
                <input
                  id="jobTitle"
                  className={styles.userDetailsItemInput}
                  value={selectedUser.jobTitle || "Не указано"}
                  type="text"
                  onChange={(e) => handleInputChange(e, "jobTitle")}
                />
              </li>
              <li className={styles.userDetailsItem}>
                <label htmlFor="department">Отдел</label>
                <input
                  id="department"
                  className={styles.userDetailsItemInput}
                  value={selectedUser.department || "Не указано"}
                  type="text"
                  onChange={(e) => handleInputChange(e, "department")}
                />
              </li>
              <li className={styles.userDetailsItem}>
                <label htmlFor="company">Компания</label>
                <input
                  id="company"
                  className={styles.userDetailsItemInput}
                  value={selectedUser.company || "Не указано"}
                  type="text"
                  onChange={(e) => handleInputChange(e, "company")}
                />
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.saveButtonSection}>
          <button onClick={handleSubmit} className={styles.saveButton}>
            Сохранить
          </button>
        </div>
      </div>
    </>
  );
};
