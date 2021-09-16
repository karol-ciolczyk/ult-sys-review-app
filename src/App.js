import "./App.css";

import { Navbar } from "./components/Navbar";
// import { Card } from "./components/Card";
// import { Loginform } from "./components/LoginForm";
// import { SignUpForm } from "./components/SignUpForm";
// import { TodoItem } from "./components/TodoItem";
// import { TodoTasks } from "./components/TodoTasks";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <TodoItem />
      <Card>
        <Loginform />
      </Card>
      <Card>
        <SignUpForm />
      </Card>
      <TodoTasks /> */}
      <TodoList />
    </div>
  );
}

export default App;
