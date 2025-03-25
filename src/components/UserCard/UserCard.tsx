import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser, updateUser } from "../../features/users/usersSlice";
import type { AppDispatch, RootState } from "../../app/store";
import type { User } from "../../types/User";
import styles from "./UserCard.module.css";

export const UserCard: FC = () => {
  const selectedUser = useSelector((state: RootState) => state.users.selectedUser);
  const updateStatus = useSelector((state: RootState) => state.users.updateStatus);
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const updatedUser = { ...selectedUser, [field]: e.target.value };
    dispatch(setSelectedUser(updatedUser));
  };

  const handleSubmit = () => {
    dispatch(updateUser(selectedUser as User));
  };

  if (!selectedUser) {
    return (
      <>
        <div className={styles.userCard}>Пользователь не выбран</div>
      </>
    );
  }

  return (
    <>
      <div className={styles.userCard}>
        <div className={styles.userCardHeader}>
          <div>
            <input
              id="name"
              className={styles.userDetailsItemInput}
              value={selectedUser.name}
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
                  value={selectedUser.jobTitle}
                  placeholder="Не указано"
                  type="text"
                  onChange={(e) => handleInputChange(e, "jobTitle")}
                />
              </li>

              <li className={styles.userDetailsItem}>
                <label htmlFor="department">Отдел</label>
                <input
                  id="department"
                  className={styles.userDetailsItemInput}
                  value={selectedUser.department}
                  placeholder="Не указано"
                  type="text"
                  onChange={(e) => handleInputChange(e, "department")}
                />
              </li>

              <li className={styles.userDetailsItem}>
                <label htmlFor="company">Компания</label>
                <input
                  id="company"
                  className={styles.userDetailsItemInput}
                  value={selectedUser.company}
                  placeholder="Не указано"
                  type="text"
                  onChange={(e) => handleInputChange(e, "company")}
                />
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.saveButtonSection}>
          <button
            disabled={updateStatus === "loading"}
            onClick={handleSubmit}
            className={updateStatus === "loading" ? styles.saveButtonDisabled : styles.saveButton}
          >
            {updateStatus === "loading" ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>
    </>
  );
};
