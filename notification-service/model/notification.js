var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
    msg:  {
      type : String,
      required : "Message should not be empty",
   },
    source :{
        type : String,
        required : true,
    },
    op: {
      type : String,
      minlength : 2,
    },
    id :{
        type : Number,
    }   
  });

  const Notification = mongoose.model("Notification",notificationSchema);
  
  module.exports = {Notification};