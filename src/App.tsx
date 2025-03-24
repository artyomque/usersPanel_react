import { useEffect } from "react";
import { fetchUsers } from "./features/users/usersSlice";
import { useDispatch } from "react-redux";
import "./App.css";
import { UserCard } from "./components/UserCard";
import { UserList } from "./components/UserList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container">
      <UserList />
      <UserCard />
    </div>
  );
}

export default App;
