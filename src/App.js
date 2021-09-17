import { useEffect, useState } from "react/cjs/react.development";
import { UserSessionContext } from "./context/UserSesionContext";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { Card } from "./components/Card";
import { Loginform } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { TodoList } from "./components/TodoList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [jwt, setJwt] = useState(null);
  const [isProgress, setIsProgress] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

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
            <div style={{ filter: `${isBlur ? "blur(6px)" : "blur(0px)"}` }}>
              <Navbar setJwt={setJwt} />
            </div>
            {!jwt && (
              <Route exact path="/">
                {!isProgress && (
                  <Card>
                    <Loginform setJwt={setJwt} setIsProgress={setIsProgress} />
                  </Card>
                )}
                {isProgress && (
                  <h1 style={{ color: "white", paddingTop: "20rem" }}>
                    {" "}
                    ... please wait for data{" "}
                  </h1>
                )}
              </Route>
            )}
            <Route path="/signup">
              {!isProgress && (
                <Card>
                  <SignUpForm setIsProgress={setIsProgress} />
                </Card>
              )}
              {isProgress && (
                <h1 style={{ color: "white", paddingTop: "20rem" }}>
                  {" "}
                  ... please wait for data{" "}
                </h1>
              )}
            </Route>
            {jwt && (
              <Route exact path="/">
                <TodoList setIsBlur={setIsBlur} />
              </Route>
            )}
          </div>
        </Switch>
      </Router>
    </UserSessionContext.Provider>
  );
}

export default App;
