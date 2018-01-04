require('../config/config.js')
const expect = require('expect')
const request = require('supertest')

const {app} = require('./../app')
const {CounterParty} = require('./../models/counterparty')

const counterParties = [{
  title: 'First Counterparty',
  code: 'C1'
}, {
  title: 'Second Counterparty',
  code: 'C2'
}]

beforeEach((done) => {
  CounterParty.remove({}).then(() => {
    return CounterParty.insertMany(counterParties)
  }).then(() => done()).catch((e) => done(e))
})

describe('POST /counterparty', () => {
  it('should create a new counterparty', (done) => {
    var newCounterparty = {
      title: 'My Counterparty',
      code: 'C3'
    }

    request(app)
      .post('/counterparty')
      .send(newCounterparty)
      .expect(200)
      .expect((res) => {
        expect(res.body.code).toBe(newCounterparty.code)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        CounterParty.find(newCounterparty).then((counterParties) => {
          expect(counterParties.length).toBe(1)
          expect(counterParties[0].code).toBe(newCounterparty.code)
          done()
        }).catch((e) => done(e))
      })
  })

  it('should not create counterparty with invalid body data', (done) => {
    request(app)
      .post('/counterparty')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        CounterParty.find({}).then((counterParties) => {
          expect(counterParties.length).toBe(2)
          done()
        }).catch((e) => done(e))
      })
  })
})

describe('GET /counterparty', () => {
  it('should get all counterparties', (done) => {
    request(app)
      .get('/counterparty')
      .expect(200)
      .expect((res) => {
        expect(res.body.counterParties.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /counterparty/:code', () => {
  it('should return counterparty doc', (done) => {
    request(app)
      .get(`/counterparty/${counterParties[0].code}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.counterParty.title).toBe(counterParties[0].title)
        expect(res.body.counterParty.code).toBe(counterParties[0].code)
      })
      .end(done)
  })

  it('should return 404 if counterparty not found', (done) => {
    var newCode = 'C8'

    request(app)
      .get(`/counterparty/${newCode}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if counterparty code is invalid', (done) => {
    request(app)
      .get('/counterparty/123abc')
      .expect(404)
      .end(done)
  })
})

describe('DELETE /counterparty/:code', () => {
  it('should remove a counterparty', (done) => {
    var code = counterParties[1].code
    request(app)
      .delete(`/counterparty/${code}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.counterParty.code).toBe(code)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        CounterParty.findOne({code}).then((counterParty) => {
          expect(counterParty).toNotExist()
          done()
        }).catch((e) => done(e))
      })
  })

  it('should return 404 if counterparty not found', (done) => {
    var newCode = 'C9'

    request(app)
      .delete(`/counterparty/${newCode}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if counterparty code is invalid', (done) => {
    request(app)
      .delete('/counterparty/123abc')
      .expect(404)
      .end(done)
  })
})

describe('PATCH /counterparty/:code', () => {
  it('should update the counterparty', (done) => {
    var code = counterParties[0].code
    var title = 'This should be the new title'

    request(app)
      .patch(`/counterparty/${code}`)
      .send({title})
      .expect(200)
      .expect((res) => {
        expect(res.body.counterParty.title).toBe(title)
        expect(res.body.counterParty.code).toBe(code)
      })
      .end(done)
  })

  it('should return 404 if counterparty not found', (done) => {
    var newCode = 'C10'
    var title = 'This should be the new text!!'

    request(app)
      .patch(`/counterparty/${newCode}`)
      .send({title})
      .expect(404)
      .end(done)
  })
})
