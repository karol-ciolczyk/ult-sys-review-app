import { useState } from "react/cjs/react.development";
import { UserSessionContext } from "./context/UserSesionContext";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import { Loginform } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
// import { TodoItem } from "./components/TodoItem";
// import { TodoList } from "./components/TodoList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [jwt, setJwt] = useState(null);
  console.log(jwt);

  return (
    <UserSessionContext.Provider
      value={{
        token: jwt,
      }}
    >
      <Router>
        <div className="App">
          <Navbar />
          <Card>
            <Loginform setJwt={setJwt} />
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
