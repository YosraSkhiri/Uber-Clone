import { Switch, Route } from "react-router-dom";
import './assets/style/sass/style.scss';
import Map from "./components/Map";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/map" exact>
          <Map />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login/:accountType" exact>
          <Login />
        </Route>
      </Switch>
    </>
  );
}

export default App;
