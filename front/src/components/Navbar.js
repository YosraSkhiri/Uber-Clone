import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedIn } from '../redux/actions';
import ModalLogin from "./ModalLogin";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.login);
  const user = useSelector(state => state.userData);
  const [loginModalIsShown, setLoginModalIsShown] = useState(false);

  useEffect(() => {
    if(Cookies.get('isLogged') === 'true') {
      dispatch(isLoggedIn());
    }
  });

  const showModal = () => {
    setLoginModalIsShown(true);
  }

  const hideModal = () => {
    setLoginModalIsShown(false);
  }

  return (
    <>
    <nav className="navbar">
      <Link to="/">
        <Logo color="white" width={55}/>
      </Link>
      <ul className="navbar_links">
        {
          isLogged ?
            <li>
              <button to="/signup" className="btn btn-sm btn--round btn-white" >
                Welcome {user.firstname}!
              </button>
            </li> :
            <>
            <li>
              <button 
                className="btn btn--icon btn-sm btn--round btn-black"
                onClick={ showModal }
              >
              <span className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.5 6.5c0 3-2.5 5.5-5.5 5.5S6.5 9.5 6.5 6.5 9 1 12 1s5.5 2.5 5.5 5.5zm-3 0C14.5 5.1 13.4 4 12 4S9.5 5.1 9.5 6.5 10.6 9 12 9s2.5-1.1 2.5-2.5zM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3h-3v-3c0-1.7-1.4-3-3-3H9c-1.6 0-3 1.3-3 3v3H3v-3z" fill="currentColor"/>
                </svg>
              </span>
              Log in
              </button>
            </li>
            <li>
              <Link to="/signup" className="btn btn-sm btn--round btn-white" >Sign up</Link>
            </li>
          </>
        }
      </ul>
    </nav>
    <ModalLogin loginModalIsShown={ loginModalIsShown } hideModal={ hideModal }/>
    </>
  );
};

export default Navbar;
