import "./App.css";
import { Card } from "./components/Card";
import { Loginform } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { TodoTasks } from "./components/TodoTasks";

function App() {
  return (
    <div className="App">
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
