var mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TradeDB');

var Counter = require('../api/models/counterModel');

var counter = new Counter({
    _id:'tradeSeqId'
});

// counter.save().then((doc) =>{
//     console.log(doc)
// });

Counter.findByIdAndUpdate({_id:'tradeSeqId'}, {$inc:{seq:1}}, {new:true}, (error, response) =>{ 
    console.log(response);
});



