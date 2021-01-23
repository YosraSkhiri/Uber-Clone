import React, { Component } from 'react';
import Navbar from '../Navbar';
import apiConsumer from '../../api';
import { v4 as uuidv4 } from 'uuid';

class Settings extends Component{

    constructor() {
        super();
        this.state = {
            updateForm: {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                state: ''
            },

            resetPassword: {
                oldPassword: '',
                newPassword: ''
            }
        }
        this.getUserData = this.getUserData.bind(this);
        this.handleChangeForUpdate = this.handleChangeForUpdate.bind(this);
        this.handleSubmitForUpdate = this.handleSubmitForUpdate.bind(this);
    }

    tunisianStates = ['Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 
                            'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 
                            'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 
                            'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 
                            'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'];


    async getUserData(){
        try {
            const userData = await apiConsumer.get('user/me');
            this.setState({ updateForm: userData.data });
        } catch(error) {
            return error
        }
    }

    handleChangeForUpdate(e) {
        const { name, value } = e.target;
        this.setState({
            updateForm: { 
                ...this.state.updateForm,
                [name]: value 
            }
        });
    }

    async handleSubmitForUpdate(e) {
        e.preventDefault();
        try {
            await apiConsumer.post('user/update', this.state.updateForm);

        } catch(error) {

        }
    }

    componentDidMount() {
        this.getUserData();
    }

    render() {
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h1 className="heading-1 center-txt">Settings</h1>
                    <div className="flex flex-gap-lg">
                        <div className="flex-item-1">
                            <h2 className="heading-2">Update your profile information</h2>
                            <form onSubmit={ this.handleSubmitForUpdate}>
                            <label className="bl txt-input-label" htmlFor="firstname">Firstname</label>
                                <input 
                                    type="text"
                                    placeholder="Firstname" 
                                    id="firstname" 
                                    name="firstname" 
                                    className="txt-input"
                                    value={ this.state.updateForm.firstname}
                                    onChange={ this.handleChangeForUpdate }
                                />

                                <label className="bl txt-input-label" htmlFor="lastname">Lastname</label>
                                <input
                                    type="text" 
                                    placeholder="Lastname" 
                                    id="lastname" 
                                    name="lastname"
                                    className="txt-input"
                                    value={ this.state.updateForm.lastname}
                                    onChange={ this.handleChangeForUpdate }
                                />

                                <label className="bl txt-input-label" htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    id="email" 
                                    name="email"
                                    className="txt-input"
                                    value={ this.state.updateForm.email}
                                    onChange={ this.handleChangeForUpdate }
                                />

                                <label className="bl txt-input-label" htmlFor="phone">Phone</label>
                                <input 
                                    type="text" 
                                    placeholder="Phone" 
                                    id="phone" 
                                    name="phone"
                                    className="txt-input"
                                    value={ this.state.updateForm.phone}
                                    onChange={ this.handleChangeForUpdate }
                                />

                                <label className="bl txt-input-label" htmlFor="state">State</label>
                                <select 
                                    id="state" 
                                    name="state"
                                    className="txt-input"
                                    value={this.state.updateForm.state}
                                    onChange={ this.handleChangeForUpdate }
                                >
                                    {
                                        this.tunisianStates.map(state => (
                                            <option value={ state } key={ uuidv4() }>{ state }</option>
                                        ))
                                    }
                                </select>

                                <button type="submit" className="btn btn--rect-m btn-black btn--rect-full-width">Confirm Update</button>
                            </form>
                        </div>
                        <div className="flex-item-1">
                            <h2 className="heading-2">Reset password</h2>
                            <form>

                                <label className="bl txt-input-label" htmlFor="password">Old Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    id="password" 
                                    name="password"
                                    className="txt-input"                        
                                />

                                <label className="bl txt-input-label" htmlFor="password">New Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    id="password" 
                                    name="password"
                                    className="txt-input"
                                />

                                <button type="submit" className="btn btn--rect-m btn-black btn--rect-full-width">Reset Password</button>
                            </form>

                            <h2 className="heading-2 heading-2--mr-1">Delete Account</h2>
                            <form>
                                <button type="submit" className="btn btn--rect-m btn-black btn--rect-full-width">Delete Account</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;
