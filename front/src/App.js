import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './assets/style/sass/style.scss';
import Notification from "./components/Notification";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login/:accountType" exact>
          <Login />
        </Route>
      </Switch>
      <Notification />
    </Router>
  );
}

export default App;
