import "./App.css";
import { Card } from "./components/Card";
import { Loginform } from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <Card>
        <Loginform />
      </Card>
    </div>
  );
}

export default App;
