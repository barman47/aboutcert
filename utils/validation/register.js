const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ?  data.name : '';
    data.email = !isEmpty(data.email) ?  data.email : '';
    data.phone = !isEmpty(data.phone) ?  data.phone : '';
    data.password = !isEmpty(data.password) ?  data.password : '';
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ?  data.dateOfBirth : '';

    if (!Validator.isLength(data.name, { min: 2, max: 15 })) {
        errors.name = 'Name must be from 2 to 15 characters long!'
    }
    if(Validator.isNumeric(data.name)) {
        errors.name = 'Name cannot be a number!';
    }
    if (Validator.isEmail(data.name)) {
        errors.name = 'Name cannot be an email!';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required!';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email address is required!';
    }

    if (!Validator.isMobilePhone(data.phone)) {
        errors.phone = 'Invalid Phone number';
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone number is required!';
    }

    if (!Validator.isLength(data.password, { min: 8})) {
        errors.password = 'Password must be at least 8 characters long!'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required!';
    }

    if (Validator.isNumeric(data.gender) || Validator.isEmail(data.gender) || !data.gender.toUpperCase() === 'MALE' || !data.gender.toUpperCase() === 'FEMALE') {
        errors.gender = 'Invalid gender!';
    }
    if (Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender is required!';
    }

    if (!Validator.isDate(data.dateOfBirth, { strictMode: false, format: 'DD/MM/YYYY' })) {
        errors.dateOfBirth = 'Invalid date Of birth!';
    }
    if (Validator.isEmpty(data.dateOfBirth)) {
        errors.dateOfBirth = 'Date of birth is required!';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};