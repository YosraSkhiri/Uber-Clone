validateUserUpdate = (updatedData) => {
    let {
        firstname,
        lastname,
        email,
        phone,
        state,
        password
    } = updatedData;

    let validationErrors = [];

    if(!firstname || !lastname || !email || !phone || !state || !password) {
        if(!firstname) {
            validationErrors.push('Firstname is required.');
        }

        if(!lastname) {
            validationErrors.push('Lastname is required.');
        }

        if(!email) {
            validationErrors.push('Email is required.');
        }

        if(!phone) {
            validationErrors.push('Phone number is required.');
        }

        if(!state) {
            validationErrors.push('State is required.');
        }

        if(!password) {
            validationErrors.push('Password is required.');
        }
    }

    if(firstname && firstname.length < 3) {
        validationErrors.push('Your firstname must have at leat 3 characters.');
    }

    if(lastname && lastname.length < 3) {
        validationErrors.push('Your lastname must have at leat 3 characters.');
    }

    const regularExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email && !regularExp.test(email)) {
        validationErrors.push('Please enter a valid email.');
    }

    if(phone && phone.length !== 8) {
        validationErrors.push('Your phone number is less than 8 numbers.');
    }

    const validPhoneinitials = ['9', '2', '3', '5' , '4'];
    if(phone && !validPhoneinitials.includes(phone.substring(0, 1))) {
        validationErrors.push('Please enter a valid phone number.');
    }
    
    if(password && password.length < 8) {
        validationErrors.push('Please enter a longer password (min 8 characters).');
    }

    const tunisianStates = ['Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 
                            'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 
                            'Kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 
                            'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 
                            'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'];

    if(state && !tunisianStates.includes(state)) {
        validationErrors.push('Please choose a valid state.');
    }

    return validationErrors;
}

module.exports = validateUserUpdate;
