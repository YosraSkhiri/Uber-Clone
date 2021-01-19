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
                          .json({ msg: ['Logged in successfully.'] });  
            }

            return res.status(401).json({ msg: ['You entered the wrong password or the wrong email.'] });
               

        } catch(error) {
            return res.status(500).json({ errors: ['A server error has accured, Please try again later.']});
        }
    }
}
