import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { isLoggedIn } from './redux/actions';
import './assets/style/sass/style.scss';
import Map from "./components/pages/Map";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Settings from "./components/pages/Settings";

function App() {
  const dispatch = useDispatch();
  let isLogged = useSelector(state => state.login);
  useEffect(() => {
    if(Cookies.get('isLogged') === 'true') {
      dispatch(isLoggedIn());
    }
  });

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/map" exact>
          { !isLogged ? <Redirect to="/" /> : <Map /> }
        </Route>
        <Route path="/signup" exact>
          { isLogged ? <Redirect to="/" /> : <Signup /> }
        </Route>
        <Route path="/login/:accountType" exact>
          { isLogged ? <Redirect to="/" /> : <Login /> }
        </Route>
        <Route path="/settings" exact>
          { !isLogged ? <Redirect to="/" /> : <Settings /> }
        </Route>
      </Switch>
    </>
  );
}

export default App;
