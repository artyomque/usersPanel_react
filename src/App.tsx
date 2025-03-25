import "./App.css";
import { UserCard } from "./components/UserCard";
import { UserList } from "./components/UserList";

function App() {
  return (
    <div className="container">
      <UserList />
      <UserCard />
    </div>
  );
}

export default App;
