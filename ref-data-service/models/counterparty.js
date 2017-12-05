var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterPartySchema = new Schema({
  title:  String,
  code: String
});

const CounterParty = mongoose.model("CounterParty",counterPartySchema);

module.exports = {CounterParty};