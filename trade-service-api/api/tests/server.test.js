require('./../../config/config')
require('./../models/tradeListModel')

const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

const {app} = require('./../../server')
const Trade = mongoose.model('Trades')

const trades = [{
  _id: new ObjectID(1),
  qty: 10,
  price: 20.20,
  side: 'SELL',
  status: 'Nominated',
  commodity: 'CL',
  counterparty: 'AP',
  location: 'CC'
}]

beforeEach((done) => {
  Trade.remove({}).then(() => {
    return Trade.insertMany(trades)
  }).then(() => done()).catch((e) => done(e))
})
describe('TradeService Routes : ', () => {
  describe('POST /trades', () => {
    it('should create a new trade', (done) => {
      var trade = {
        qty: 176,
        price: 20.20,
        side: 'SELL',
        status: 'Nominated',
        commodity: 'CL',
        counterparty: 'AP',
        location: 'CC'
      }

      request(app)
        .post('/trades')
        .send(trade)
        .expect(200)
        .expect((res) => {
          expect(res.body.qty).toBe(trade.qty)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          Trade.find().then((trades) => {
            expect(trades.length).toBe(2)
            expect(trades[0].quantity).toBe(trade.quantity)
            done()
          }).catch((e) => done(e))
        })
    })

    it('should not create trades with invalid body data', (done) => {
      request(app)
        .post('/trades')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          Trade.find().then((trades) => {
            expect(trades.length).toBe(1)
            done()
          }).catch((e) => done(e))
        })
    })
  })

  describe('GET /trades', () => {
    it('should get all trades', (done) => {
      request(app)
        .get('/trades')
        .expect(200)
        .expect((res) => {
          expect(res.body.trades.length).toBe(1)
        })
        .end(done)
    })
  })

  describe('GET /trades/:tradeId', () => {
    it('should return trade doc', (done) => {
      request(app)
        .get(`/trades/${trades[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.qty).toBe(trades[0].qty)
        })
        .end(done)
    })

    it('should return 404 if trade not found', (done) => {
      var hexId = new ObjectID(5).toHexString()

      request(app)
        .get(`/trades/${hexId}`)
        .expect(404)
        .end(done)
    })

    it('should return 400 for invalid trade ids', (done) => {
      request(app)
        .get('/trades/abc')
        .expect(400)
        .end(done)
    })
  })

  describe('DELETE /trades/:tradeId', () => {
    it('should remove a trade', (done) => {
      var hexId = trades[0]._id.toHexString()

      request(app)
        .delete(`/trades/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBe(hexId)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          Trade.findById(hexId).then((trade) => {
            expect(trade).toNotExist()
            done()
          }).catch((e) => done(e))
        })
    })

    it('should return 404 if trade not found', (done) => {
      var hexId = new ObjectID(5).toHexString()

      request(app)
        .delete(`/trades/${hexId}`)
        .expect(404)
        .end(done)
    })

    it('should return 400 if trade id is invalid', (done) => {
      request(app)
        .delete('/trades/abc')
        .expect(400)
        .end(done)
    })
  })

  describe('PUT /trades/:tradeId', () => {
    it('should update the trade', (done) => {
      var hexId = trades[0]._id.toHexString()
      var updatedTrade = {
        qty: 30,
        price: 30.30,
        side: 'BUY',
        status: 'Closed'
      }
      request(app)
        .put(`/trades/${hexId}`)
        .send(updatedTrade)
        .expect(200)
        .expect((res) => {
          expect(res.body.qty).toBe(updatedTrade.qty)
          expect(res.body.qty).toBeA('number')
          expect(res.body.side).toBe(updatedTrade.side)
        })
        .end(done)
    })

    it('should return 404 when trade not found', (done) => {
      var hexId = new ObjectID(10).toHexString()
      var updatedTrade = {}

      request(app)
        .put(`/trades/${hexId}`)
        .send(updatedTrade)
        .expect(404)
        .end(done)
    })
  })
})
