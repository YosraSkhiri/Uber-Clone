import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import apiConsumer from '../../api';
import Navbar from '../Navbar';

const Login = () => {
    const { accountType } = useParams();
    const [loginInput, setLoginInpput] = useState({
        email: '',
        password: '',
        role: ''
    });

    useEffect(() => {
        setLoginInpput({...loginInput, role: accountType});
    }, [setLoginInpput]);

    const handleChange = (e) => {
        setLoginInpput({...loginInput,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apiConsumer.post('auth/login', loginInput);
            console.log(res.data.msg);
        } catch(error) {
            console.log(error.response.data.errors)
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
        </div>
    )
}

export default Login;
