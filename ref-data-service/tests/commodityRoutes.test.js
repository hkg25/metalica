require('../config/config.js')
const expect = require('expect')
const request = require('supertest')

const {app} = require('./../app')
const {Commodity} = require('./../models/commodity')

const commodities = [{
  title: 'First Commodity',
  code: 'AL'
}, {
  title: 'Second Commodity',
  code: 'CL'
}]

beforeEach((done) => {
  Commodity.remove({}).then(() => {
    return Commodity.insertMany(commodities)
  }).then(() => done()).catch((e) => done(e))
})

describe('POST /commodity', () => {
  it('should create a new commodity', (done) => {
    var newCommodity = {
      title: 'My Commodity',
      code: 'CC'
    }

    request(app)
      .post('/commodity')
      .send(newCommodity)
      .expect(200)
      .expect((res) => {
        expect(res.body.code).toBe(newCommodity.code)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Commodity.find(newCommodity).then((commodities) => {
          expect(commodities.length).toBe(1)
          expect(commodities[0].code).toBe(newCommodity.code)
          done()
        }).catch((e) => done(e))
      })
  })

  it('should not create commodity with invalid body data', (done) => {
    request(app)
      .post('/commodity')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Commodity.find({}).then((commodities) => {
          expect(commodities.length).toBe(2)
          done()
        }).catch((e) => done(e))
      })
  })
})

describe('GET /commodity', () => {
  it('should get all commodities', (done) => {
    request(app)
      .get('/commodity')
      .expect(200)
      .expect((res) => {
        expect(res.body.commodities.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /commodity/:code', () => {
  it('should return commodity doc', (done) => {
    request(app)
      .get(`/commodity/${commodities[0].code}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.commodity.title).toBe(commodities[0].title)
        expect(res.body.commodity.code).toBe(commodities[0].code)
      })
      .end(done)
  })

  it('should return 404 if commodity not found', (done) => {
    var newCode = 'XL'

    request(app)
      .get(`/commodity/${newCode}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if commodity code is invalid', (done) => {
    request(app)
      .get('/commodity/123abc')
      .expect(404)
      .end(done)
  })
})

describe('DELETE /commodity/:code', () => {
  it('should remove a commodity', (done) => {
    var code = commodities[1].code
    request(app)
      .delete(`/commodity/${code}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.commodity.code).toBe(code)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Commodity.findOne({code}).then((commodity) => {
          expect(commodity).toNotExist()
          done()
        }).catch((e) => done(e))
      })
  })

  it('should return 404 if commodity not found', (done) => {
    var newCode = 'XL'

    request(app)
      .delete(`/commodity/${newCode}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if commodity code is invalid', (done) => {
    request(app)
      .delete('/commodity/123abc')
      .expect(404)
      .end(done)
  })
})

describe('PATCH /commodity/:code', () => {
  it('should update the commodity', (done) => {
    var code = commodities[0].code
    var title = 'This should be the new title'

    request(app)
      .patch(`/commodity/${code}`)
      .send({title})
      .expect(200)
      .expect((res) => {
        expect(res.body.commodity.title).toBe(title)
        expect(res.body.commodity.code).toBe(code)
      })
      .end(done)
  })

  it('should return 404 if commodity not found', (done) => {
    var newCode = 'XL'
    var title = 'This should be the new text!!'

    request(app)
      .patch(`/commodity/${newCode}`)
      .send({title})
      .expect(404)
      .end(done)
  })
})
