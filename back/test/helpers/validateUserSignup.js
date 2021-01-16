const assert = require('chai').assert;
const validateUserSignup = require('../../helpers/validateUserSignup');

describe('Validate user signup input', function(){

    it('validateUserSignup should return an empty array', function(){
        const signupData = {
            firstname: 'Yosra',
            lastname: 'Skhiri',
            email: 'yosra.skhiri.mail@gamil.com',
            phone: '20202020',
            state: 'Ariana',
            password: '123456789',
            role: 'rider'
        }
        assert.deepEqual(validateUserSignup(signupData), []);
    });

    it('validateUserSignup should return an array of all the errors related to missing values', function() {
        const result = [
            'Firstname is required.',
            'Lastname is required.',
            'Email is required.',
            'Phone number is required.',
            'State is required.',
            'Password is required.',
            'Please choose if you want a driver account or a rider account.'
        ]
        assert.deepEqual(validateUserSignup({}), result);
    });

    it('validateUserSignup should return an array of errors related to the length of the firstname and the lastname', function() {
        const signupData = {
            firstname: 'Y',
            lastname: 'S',
            email: 'yosra.skhiri.mail@gamil.com',
            phone: '20202020',
            state: 'Ariana',
            password: '123456789',
            role: 'rider'
        };

        const result = [
            'Your firstname must have at leat 3 characters.',
            'Your lastname must have at leat 3 characters.'
        ];

        assert.deepEqual(validateUserSignup(signupData), result);
    });

    it('validateUserSignup should return an array containing an error about an invalid email.', function() {
        const signupData = {
            firstname: 'Yosra',
            lastname: 'Skhiri',
            email: 'yosra.skhiri.mailgamil.com',
            phone: '20202020',
            state: 'Ariana',
            password: '123456789',
            role: 'rider'
        };

        const result = [
            'Please enter a valid email.'
        ];

        assert.deepEqual(validateUserSignup(signupData), result);
    });

    it('validateUserSignup should return an array containing an error about an invalid phone number.', function() {
        const signupData = {
            firstname: 'Yosra',
            lastname: 'Skhiri',
            email: 'yosra.skhiri.mail@gamil.com',
            phone: '02020',
            state: 'Ariana',
            password: '123456789',
            role: 'rider'
        };

        const result = [
            'Your phone number is less than 8 numbers.',
            'Please enter a valid phone number.'
        ];

        assert.deepEqual(validateUserSignup(signupData), result);
    });

    it('validateUserSignup should return an array containing an error about a short password.', function() {
        const signupData = {
            firstname: 'Yosra',
            lastname: 'Skhiri',
            email: 'yosra.skhiri.mail@gamil.com',
            phone: '20202020',
            state: 'Ariana',
            password: '123456',
            role: 'rider'
        };

        const result = [
            'Please enter a longer password (min 8 characters).',
        ];

        assert.deepEqual(validateUserSignup(signupData), result);
    });

    it('validateUserSignup should return an array containing an error about an invalid role.', function() {
        const signupData = {
            firstname: 'Yosra',
            lastname: 'Skhiri',
            email: 'yosra.skhiri.mail@gamil.com',
            phone: '20202020',
            state: 'Ariana',
            password: '12345678',
            role: 'a guy'
        };

        const result = [
            'Please choose a rider account or a driver account.',
        ];

        assert.deepEqual(validateUserSignup(signupData), result);
    });

    it('validateUserSignup should return an array containing an error about an invalid state.', function() {
        const signupData = {
            firstname: 'Yosra',
            lastname: 'Skhiri',
            email: 'yosra.skhiri.mail@gamil.com',
            phone: '20202020',
            state: 'Ariano',
            password: '12345678',
            role: 'driver'
        };

        const result = [
            'Please choose a valid state.',
        ];

        assert.deepEqual(validateUserSignup(signupData), result);
    });
});
