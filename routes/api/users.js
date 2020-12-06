const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../../models/User');

const validateRegisterUser = require('../../utils/validation/register');
const validateLoginUser = require('../../utils/validation/login');
const { secretOrKey } = require('../../config/keys');

// Register new user
router.post('/register', async (req, res) => {
    const { errors, isValid } = validateRegisterUser(req.body);
    if (!isValid) {
        return res.status(406).json(errors);
    }

    try {
        const { name, email, phone, password, gender, dateOfBirth } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            errors.email = 'User already exists';
            return res.status(406).json(errors);
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({
            name: name.toUpperCase(),
            email: email.toLowerCase(),
            phone,
            password: hash,
            gender: gender.toUpperCase(),
            dateOfBirth: new Date(dateOfBirth).toISOString()
        });

        const newUser = await user.save();
        const { password, ...rest } = newUser;

        const payload = {...rest};
        const token = await jwt.sign(payload, secretOrKey, { expiresIn: '30 days' });
        return res.status(201).json({ msg: 'User created successfully', user: { ...rest }, token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
});

// Login user user
router.post('/login', async (req, res) => {
    const { errors, isValid } = validateLoginUser(req.body);

    if (!isValid) {
        return res.status(406).json(errors);
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            errors.email = 'User not registered!';
            return res.status(404).json(errors);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            errors.password = 'Incorrect Password!';
            return res.status(401).json(errors);
        }

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            createdAt: user.createdAt
        };

        const token = await jwt.sign(payload, secretOrKey, { expiresIn: '30 days' });
        return res.status(202).json({ msg: 'User logged in', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;