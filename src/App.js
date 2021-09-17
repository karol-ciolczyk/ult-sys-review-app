import "./App.css";

import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import { Loginform } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { TodoItem } from "./components/TodoItem";
// import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Card>
        <Loginform />
      </Card>
      <Card>
        <SignUpForm />
      </Card>
      {/* <TodoList /> */}
    </div>
  );
}

export default App;
