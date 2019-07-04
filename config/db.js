const mongoose = require('mongoose');
const keys = require('./keys');
const dbMongo = keys.mongoURI;

const connectDB = async () => {

    try {
        await mongoose.connect(dbMongo, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('mongo connected');
        
    } catch (error) {
        console.error(err.message);
        console.log('Connected failed');
        console.log(dbMongo);
        process.exit(1);
    }

};

module.exports = connectDB;