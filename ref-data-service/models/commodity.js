const mongoose = require('mongoose');
const commoditySchema = require("../models/refDataSchema")

const Commodity = mongoose.model("Commodity",commoditySchema);

module.exports = {Commodity};