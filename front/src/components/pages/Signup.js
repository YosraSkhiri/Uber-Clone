import React, { useState } from 'react'

const Signup = () => {
    const [signupInput, setSignupInpput] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        state: '',
        role: ''
    });

    const handleChange = (e) => {
        setSignupInpput({...signupInput,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e) => {
        
    }

    return (
        <div>
            <div>
                <h1>Sign up</h1>
                <form>
                    <label className="bl" htmlFor="firstname">Firstname</label>
                    <input 
                        type="text" 
                        placeholder="Firstname" 
                        id="firstname" 
                        name="firstname" 
                        onChange={handleChange}
                        value={signupInput.firstname}
                    />

                    <label className="bl" htmlFor="lastname">Lastname</label>
                    <input 
                        type="text" 
                        placeholder="Lastname" 
                        id="lastname" 
                        name="lastname"
                        onChange={handleChange}
                        value={signupInput.lastname}
                    />

                    <label className="bl" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        id="email" 
                        name="email"
                        onChange={handleChange}
                        value={signupInput.email}
                    />

                    <label className="bl" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        id="password" 
                        name="password"
                        onChange={handleChange}
                        value={signupInput.password}
                    />

                    <label className="bl" htmlFor="state">State</label>
                    <select 
                        onChange={handleChange}
                        value={signupInput.state}
                        id="state" 
                        name="state"
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
                    <div>
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

                    <button 
                        type="submit" 
                        onSubmit={handleSubmit}
                    >Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;