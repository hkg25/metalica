const mongoose = require('mongoose');

var SequenceSchema = new mongoose.Schema({
  nextSeqNumber: { type: Number, default: 1 }
});
var TradeIdSequence = mongoose.model('TradeIdSequence', SequenceSchema);

var nextTradeIdSequence = function(callback) {
  TradeIdSequence.find(function(err, data){
      if (err) {
        throw(err);
      }
      if(data.length < 1){
         // create if doesn't exist create and return first
         TradeIdSequence.create({}, function(err, seq){
           if(err) { throw(err); }
           callback(seq.nextSeqNumber);
         });
       } else {
          TradeIdSequence.findByIdAndUpdate(data[0]._id, { $inc: { nextSeqNumber: 1 } }, function(err, seq) {
            if(err) {
              throw(err);
            }
            callback(seq.nextSeqNumber);
          })
    };
  });
};

module.exports = nextTradeIdSequence;
