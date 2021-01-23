const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('config');
const validateUserSignup = require('../helpers/validateUserSignup');
const validateUserLogin = require('../helpers/validateUserLogin');

module.exports = {
    signup: async (req, res) => {

        let signUpData = {
            firstname,
            lastname,
            email,
            phone,
            state,
            password,
            role
        } = req.body;


        const validationResults = validateUserSignup(signUpData);

        if(validationResults.length > 0) {
            return res.status(400).json({ errors: validationResults });
        }

        try {
            const user = await User.findOne({ email, role });

            if(user) {
                return res.status(400).json({ errors: ['This email is already used.']});
            }

            const hash = await bcrypt.hash(password, 10);
            signUpData.password = hash;

            const newAccount = new User(signUpData);
            const savedAccount = await newAccount.save();

            return res.status(200).json({ msg: ['Your account is successfully saved!']})

        } catch(error) {
            return res.status(500).json({ errors: ['A server error has accured, Please try again later.']})
        }
    },

    login: async (req, res) => {
        let loginData = {
            email,
            password,
            role
        } = req.body;

        const validationResults = validateUserLogin(loginData);

        if(validationResults.length > 0) {
            return res.status(400).json({ errors: validationResults });
        }

        try {
            const user = await User.findOne({ email, role });
            if(!user) {
                return res.status(401).json({errors: ['Please enter the right email and the right password.']});
            }
            
            const userId = user._id;
            const passwordCompareResult = await bcrypt.compare(password, user.password);

            if(passwordCompareResult){
                const token = await jwt.sign({ userId }, config.get('jwtPrivateKey'));
                return res.status(200)
                          .cookie('loginToken', token, { httpOnly: true, secure: true })
                          .cookie('isLogged', 'true', { secure: true })
                          .json({ firstname: user.firstname });  
            }

            return res.status(401).json({ msg: ['You entered the wrong password or the wrong email.'] });
               

        } catch(error) {
            return res.status(500).json({ errors: ['A server error has accured, Please try again later.']});
        }
    },

    logout: (req, res) => {
        res.clearCookie('loginToken', {httpOnly: true});
        res.clearCookie('isLogged');
        return res.status(200).json({msg: ['Logged out successfully!']});
    },

    resetPassword: async (req, res) => {
        const {
            oldPassword,
            newPassword
        } = req.body;

        if(newPassword.length < 8) {
            return res.status(401).json({ errors: ['Your new password should be more then 7 characters.']})
        }

        try {
            const userOldPassword = await User.findById(req.user).select('password -_id');
            if(userOldPassword) {
                const passwordCompareResult = await bcrypt.compare(oldPassword, userOldPassword.password);
                if(passwordCompareResult){
                    const hash = await bcrypt.hash(newPassword, 10);

                    const newData = await User.updateOne({ _id: req.user }, {
                        '$set': {'password': hash}
                    });

                    res.status(200).json({msg: ['Your password has been successfully updated!']});
                }
            }

        } catch(error) {
            return res.status(500).json({ errors: ['A server error has accured, Please try again later.']});
        }
    },

    deleteAccount: async (req, res) => {
        try {
            User.deleteOne({ _id: req.user })
            res.clearCookie('loginToken', {httpOnly: true});
            res.clearCookie('isLogged');
            return res.status(200).json({ msg: ['Your account has been successfully deleted!']});
        } catch (error) {
            return res.status(500).json({ errors: ['A server error has accured, Please try again later.']});
        }
    }
}
