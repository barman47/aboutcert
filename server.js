const express = require('express');
const passport = require('passport');

const connectDB = require('./config/db');

const users = require('./routes/api/users');

const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

// Passport config
require('./config/passport');

// Passport middleware
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', users);

app.get('/', (req, res) => {
    res.send('Hello from server');
});


app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));