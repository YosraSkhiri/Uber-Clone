import React from 'react';
import { Link } from 'react-router-dom';

const ModalLogin = ({ loginModalIsShown, toggleModal }) => {

    return(
        <>
        {   loginModalIsShown ?
            <div className="login-modal" >
                <div 
                    className="close-btn"
                    onClick={ toggleModal }
                >
                    <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
                        <path d="M18.1 8.1l-2.2-2.2-3.9 4-3.9-4-2.2 2.2 4 3.9-4 3.9 2.2 2.2 3.9-4 3.9 4 2.2-2.2-4-3.9 4-3.9z" fill="currentColor"/>
                    </svg>
                </div>  
                <div className="login-modal_links">
                    <Link 
                        onClick={ toggleModal }
                        to="/login/driver" 
                        className="login-modal_link">Driver login</Link>
                    <Link 
                        onClick={ toggleModal }
                        to="/login/rider"
                        className="login-modal_link">Rider login</Link>  
                </div>
            </div> : null
        }
        </>
    );
}

export default ModalLogin;