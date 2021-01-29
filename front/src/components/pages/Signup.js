import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import apiConsumer from '../../api';
import Navbar from '../Navbar';
import Toast from '../Toast';
import Cookies from 'js-cookie';
import { isLoggedIn } from '../../redux/actions';

const Signup = () => {
    const dispatch = useDispatch();
    let isLogged = useSelector(state => state.login);
    const [signupInput, setSignupInpput] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        state: '',
        role: ''
    });
    const [messages, setMessages] = useState();

    const handleChange = (e) => {
        setSignupInpput({...signupInput,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await apiConsumer.post('auth/signup/', signupInput);
            console.log(res.data.msg);
        } catch(error) {
            setMessages(error.response.data.errors);
        }
    }

    useEffect(() => {
        if(Cookies.get('isLogged') === 'true') {
          dispatch(isLoggedIn());
        }
      });

    return (
        <div>
            <Navbar />
            {   
                (!isLogged && isLogged !== undefined) ?
                <div className="form-container">
                    <h1 className="heading-1 center-txt">Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <label className="bl txt-input-label" htmlFor="firstname">Firstname</label>
                        <input 
                            type="text" 
                            placeholder="Firstname" 
                            id="firstname" 
                            name="firstname" 
                            onChange={handleChange}
                            value={signupInput.firstname}
                            className="txt-input"
                        />

                        <label className="bl txt-input-label" htmlFor="lastname">Lastname</label>
                        <input
                            type="text" 
                            placeholder="Lastname" 
                            id="lastname" 
                            name="lastname"
                            onChange={handleChange}
                            value={signupInput.lastname}
                            className="txt-input"
                        />

                        <label className="bl txt-input-label" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            id="email" 
                            name="email"
                            onChange={handleChange}
                            value={signupInput.email}
                            className="txt-input"
                        />

                        <label className="bl txt-input-label" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            id="password" 
                            name="password"
                            onChange={handleChange}
                            value={signupInput.password}
                            className="txt-input"
                        />

                        <label className="bl txt-input-label" htmlFor="state">State</label>
                        <select 
                            onChange={handleChange}
                            value={signupInput.state}
                            id="state" 
                            name="state"
                            className="txt-input"
                        >
                            <option value="Ariana">Ariana</option>
                            <option value="Beja">Beja</option>
                            <option value="Ben Arous">Ben Arous</option>
                            <option value="Bizerte">Bizerte</option>
                            <option value="Gabes">Gabes</option>
                            <option value="Gafsa">Gafsa</option>
                            <option value="Jendouba">Jendouba</option>
                            <option value="Kairouan">Kairouan</option>
                            <option value="Kasserine">Kasserine</option>
                            <option value="Kebili">Kebili</option>
                            <option value="Kef">Kef</option>
                            <option value="Mahdia">Mahdia</option>
                            <option value="Manouba">Manouba</option>
                            <option value="Medenine">Medenine</option>
                            <option value="Monastir">Monastir</option>
                            <option value="Nabeul">Nabeul</option>
                            <option value="Sfax">Sfax</option>
                            <option value="Sidi Bouzid">Sidi Bouzid</option>
                            <option value="Siliana">Siliana</option>
                            <option value="Sousse">Sousse</option>
                            <option value="Tataouine">Tataouine</option>
                            <option value="Tozeur">Tozeur</option>
                            <option value="Tunis">Tunis</option>
                            <option value="Zaghouan">Zaghouan</option>
                        </select>
                        <div className="radio-btn-group">
                            <p className="txt-input-label">Choose a rider account or a driver account</p>
                            <input 
                                type="radio" 
                                id="rider" 
                                name="role" 
                                value="rider"
                                onChange={handleChange}
                            /> <label htmlFor="rider">Rider</label>
                            <input 
                                type="radio" 
                                id="driver" 
                                name="role" 
                                value="driver"
                                onChange={handleChange}
                            /> <label htmlFor="driver">Driver</label>   
                        </div> 

                        <button type="submit" className="btn btn--rect-m btn-black btn--rect-full-width">Sign up</button>
                    </form>
                </div> : null
            }
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

export default Signup;
