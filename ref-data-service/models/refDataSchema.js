var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var refDataSchema = new Schema({
    title:  {
      type : String,
      required : true
    },
    code: {
      type : String,
      required : true,
      minlength:2,
      unique : true    
    }
  });

  module.exports = refDataSchema;