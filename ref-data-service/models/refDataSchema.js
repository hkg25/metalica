var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var refDataSchema = new Schema({
    title:  {
      type : String,
      required : "Title should not be empty",
      unique : "Title should be unique"
    },
    code: {
      type : String,
      required : "Code shoule not be empty",
      minlength : 2,
      unique : "Code should be unique",
      uppercase : true    
    }
  });

  module.exports = refDataSchema;