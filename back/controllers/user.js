const User = require('../models/User');
const validateUserUpdate = require('../helpers/validateUserUpdate');

module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user);
            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({ errors: ['A server error has accured, Please try again later.']});
        }
    },

    updateUser: async (req, res) => {
        let newUserData = {
            firstname,
            lastname,
            email,
            phone,
            state,
        } = req.body;

        const validationResults = validateUserUpdate(newUserData);

        if(validationResults.length > 0) {
            return res.status(400).json({ errors: validationResults });
        }

        try {
            await User.updateOne({ _id: req.user }, newUserData);
            return res.status(200).json({ msg: ['Your information has been updated!']});
        } catch(error) {
            return res.status(500).json({ errors: ['A server error has accured, Please try again later.']});
        }
    },

    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user);
            res.clearCookie('loginToken', {httpOnly: true});
            res.clearCookie('isLogged');
            return res.status(200).json({ msg: ['Your account has been deleted!']});
        } catch(error) {
            return res.status(500).json({ errors: ['A server error has accured, Please try again later.']});
        }
    }
}
