const mongoose = require('mongoose');
const locationSchema = require("../models/refDataSchema")

const Location = mongoose.model("Location",locationSchema);

module.exports = {Location};