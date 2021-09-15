import "./App.css";
import { Card } from "./components/Card";
import { Loginform } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { TodoItem } from "./components/TodoItem";
import { TodoTasks } from "./components/TodoTasks";

function App() {
  return (
    <div className="App">
      <TodoItem />
      <Card>
        <Loginform />
      </Card>
      <Card>
        <SignUpForm />
      </Card>
      <TodoTasks />
    </div>
  );
}

export default App;
