import { UserSessionContext } from "./context/UserSesionContext";

import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import { Loginform } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
// import { TodoItem } from "./components/TodoItem";
// import { TodoList } from "./components/TodoList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <UserSessionContext.Provider
      value={{
        token: "",
      }}
    >
      <Router>
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
      </Router>
    </UserSessionContext.Provider>
  );
}

export default App;
