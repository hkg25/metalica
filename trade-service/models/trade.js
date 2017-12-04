const mongoose = require('mongoose');

var Trade = mongoose.model('Trade',{
    qty:{
        type:Number,
        required:true,
        minlength:1,
        trim:true
    },
    tradeDate:{
        type:Number,
        default:null
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