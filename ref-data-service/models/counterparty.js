const mongoose = require('mongoose');
const counterPartySchema = require("../models/refDataSchema")

const CounterParty = mongoose.model("CounterParty",counterPartySchema);

module.exports = {CounterParty};