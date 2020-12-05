const mongoose = require('mongoose');

const { database_URI } = require('./keys');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(database_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;