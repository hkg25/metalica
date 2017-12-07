const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGODB_URI;

console.log(MONGO_URL);

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);

module.exports = {mongoose};