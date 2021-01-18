const assert = require('chai').assert;
const validateUserLogin = require('../../helpers/validateUserLogin');

describe('Validate user login input', function() {
    
    it('validateUserLogin should return an empty array', function() {
        const loginData = {
            email: 'yosra.skhiri.mail@gmail.com',
            password: '123456789'
        };
        assert.deepEqual(validateUserLogin(loginData), []);
    });

    it('validateUserLogin should return an array of all the errors related to missing values', function(){
        const loginData = {};
        assert.deepEqual(validateUserLogin(loginData), [
            'Email is required',
            'Password is required'
        ])
    });

    it('validateUserLogin should return an array containing an error about an invalid email', function() {
        const loginData = {
            email: '123',
            password: '123456789'
        }

        assert.deepEqual(validateUserLogin(loginData), [
            'Please enter a valid email.'
        ]);
    });
});
