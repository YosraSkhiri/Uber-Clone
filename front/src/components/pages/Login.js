import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom";
import apiConsumer from '../../api';
import Navbar from '../Navbar';
import { useDispatch } from 'react-redux';
import { isLoggedIn, setUserData } from '../../redux/actions';
import Toast from '../Toast';

const Login = () => {
    const dispatch = useDispatch();
    const { accountType } = useParams();
    const [loginInput, setLoginInpput] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [messages, setMessages] = useState();

    useEffect(() => {
        if(Cookies.get('isLogged') === 'true') {
            window.location.replace('/');
        }
        setLoginInpput(loginInput => ({...loginInput, role: accountType}));
    }, [setLoginInpput, accountType]);

    const handleChange = (e) => {
        setLoginInpput({...loginInput,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apiConsumer.post('auth/login', loginInput);
            dispatch(isLoggedIn());
            dispatch(setUserData(res.data));
            window.location.replace('/');
        } catch(error) {
            setMessages(error.response.data.errors);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="form-container">
                <h1 className="heading-1 center-txt">Login as a { loginInput.role }</h1>
                <form onSubmit={handleSubmit}>
                    <label className="bl txt-input-label" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        id="email" 
                        name="email"
                        onChange={handleChange}
                        value={loginInput.email}
                        className="txt-input"
                    />

                    <label className="bl txt-input-label" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        id="password" 
                        name="password"
                        onChange={handleChange}
                        value={loginInput.password}
                        className="txt-input"
                    />

                    <button type="submit" className="btn btn--rect-m btn-black btn--rect-full-width">login</button>
                </form>
            </div>
            {
                messages ?
                <div className="toast-wrapper">
                {
                    messages.map(msg => (
                    <Toast message={msg} key={uuidv4()} />
                    ))
                }
                </div> : null
            }
        </div>
    )
}

export default Login;
