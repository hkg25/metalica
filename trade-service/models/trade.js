const mongoose = require('mongoose');

var Trade = mongoose.model('Trade',{
    qty:{
        type:Number,
        required:true,
        minlength:1
    },
    tradeDate:{
        type:Number,
        default:Date.now
    },
    status:{
        type:String,
        default:'Open'
    },
    side:{
        type:String,
        trim:true
    },
    counterPartyCode:{
        type:String,
        trim:true
    },
    commodityCode:{
        type:String,
        trim:true
    },
    locationCode:{
        type:String,
        trim:true
    }
});

module.exports = {Trade};