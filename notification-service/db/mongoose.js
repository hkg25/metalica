const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGODB_URI

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);

module.exports = {mongoose};