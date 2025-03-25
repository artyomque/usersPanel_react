import { useEffect } from "react";
import { fetchUsers } from "./features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { UserCard } from "./components/UserCard";
import { UserList } from "./components/UserList";

function App() {
  const dispatch = useDispatch();
  const updateStatus = useSelector((state) => state.users.updateStatus);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, updateStatus]);

  return (
    <div className="container">
      <UserList />
      <UserCard />
    </div>
  );
}

export default App;
