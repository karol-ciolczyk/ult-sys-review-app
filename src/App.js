import { useEffect, useState } from "react/cjs/react.development";
import { UserSessionContext } from "./context/UserSesionContext";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import { Loginform } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { TodoList } from "./components/TodoList";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const [jwt, setJwt] = useState(null);
  const [isProgress, setIsProgress] = useState(false);
  console.log(isProgress);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) setJwt(jwt);
  }, []);

  return (
    <UserSessionContext.Provider
      value={{
        token: jwt,
      }}
    >
      <Router>
        <Switch>
          <div className="App">
            <Navbar setJwt={setJwt} />
            {!jwt && (
              <Route exact path="/">
                <Card>
                  <Loginform setJwt={setJwt} setIsProgress={setIsProgress} />
                </Card>
              </Route>
            )}
            <Route path="/signup">
              <Card>
                <SignUpForm />
              </Card>
            </Route>
            {jwt && (
              <Route exact path="/">
                <TodoList />
              </Route>
            )}
          </div>
        </Switch>
      </Router>
    </UserSessionContext.Provider>
  );
}

export default App;
