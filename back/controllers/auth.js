const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateUserSignupData = require('../helpers/validateUserSignup');

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


        const validationResults = validateUserSignupData(signUpData);

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
    }
}