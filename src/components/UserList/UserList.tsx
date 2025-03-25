import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, setSelectedUser } from "../../features/users/usersSlice";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import styles from "./UserList.module.css";
import { AppDispatch, RootState } from "../../app/store";

interface RowProps {
  index: number;
  style: React.CSSProperties;
}

export const UserList: FC = () => {
  const users = useSelector((state: RootState) => state.users.list);
  const hasMore = useSelector((state: RootState) => state.users.pagination.hasMore);
  const page = useSelector((state: RootState) => state.users.pagination.page);
  const dispatch: AppDispatch = useDispatch();

  const isItemLoaded = (index: number) => index < users.length;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadMoreItems = async (_startIndex: number, _stopIndex: number): Promise<void> => {
    if (hasMore) {
      await dispatch(fetchUsers(page));
    }
    return Promise.resolve();
  };

  const Row = ({ index, style }: RowProps) => {
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
          itemSize={25}
          width={287}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};
