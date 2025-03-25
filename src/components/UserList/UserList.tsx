import { FC, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, setSelectedUser } from "../../features/users/usersSlice";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import styles from "./UserList.module.css";

export const UserList: FC = () => {
  const users = useSelector((state) => state.users.list);
  const hasMore = useSelector((state) => state.users.pagination.hasMore);
  const page = useSelector((state) => state.users.pagination.page);
  const dispatch = useDispatch();

  const isItemLoaded = (index: number) => index < users.length;

  const loadMoreItems = () => {
    if (hasMore) {
      return dispatch(fetchUsers(page));
    }
    return Promise.resolve();
  };

  const Row = ({ index, style }: any) => {
    if (!isItemLoaded(index)) {
      return (
        <div style={style} className={styles.userListItem}>
          Loading...
        </div>
      );
    }

    const user = users[index];
    return (
      <div
        style={style}
        className={styles.userListItem}
        onClick={() => dispatch(setSelectedUser(user))}
      >
        {`${user.name} - ID ${user.id}`}
      </div>
    );
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={hasMore ? users.length + 1 : users.length}
      loadMoreItems={loadMoreItems}
      threshold={500}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={400}
          itemCount={hasMore ? users.length + 1 : users.length}
          itemSize={50}
          width={400}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};
