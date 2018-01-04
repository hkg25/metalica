require('../config/config.js')
const expect = require('expect')
const request = require('supertest')

const {app} = require('./../app')
const {Location} = require('./../models/location')

const locations = [{
  title: 'First Location',
  code: 'LA'
}, {
  title: 'Second Location',
  code: 'LB'
}]

beforeEach((done) => {
  Location.remove({}).then(() => {
    return Location.insertMany(locations)
  }).then(() => done()).catch((e) => done(e))
})

describe('POST /location', () => {
  it('should create a new location', (done) => {
    var newLocation = {
      title: 'My Location',
      code: 'LC'
    }

    request(app)
      .post('/location')
      .send(newLocation)
      .expect(200)
      .expect((res) => {
        expect(res.body.code).toBe(newLocation.code)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Location.find(newLocation).then((locations) => {
          expect(locations.length).toBe(1)
          expect(locations[0].code).toBe(newLocation.code)
          done()
        }).catch((e) => done(e))
      })
  })

  it('should not create location with invalid body data', (done) => {
    request(app)
      .post('/location')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Location.find({}).then((locations) => {
          expect(locations.length).toBe(2)
          done()
        }).catch((e) => done(e))
      })
  })
})

describe('GET /location', () => {
  it('should get all locations', (done) => {
    request(app)
      .get('/location')
      .expect(200)
      .expect((res) => {
        expect(res.body.locations.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /location/:code', () => {
  it('should return location doc', (done) => {
    request(app)
      .get(`/location/${locations[0].code}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.location.title).toBe(locations[0].title)
        expect(res.body.location.code).toBe(locations[0].code)
      })
      .end(done)
  })

  it('should return 404 if location code not found', (done) => {
    var newCode = 'XL'

    request(app)
      .get(`/location/${newCode}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if location code is invalid', (done) => {
    request(app)
      .get('/location/123abc')
      .expect(404)
      .end(done)
  })
})

describe('DELETE /location/:code', () => {
  it('should remove a location', (done) => {
    var code = locations[1].code
    request(app)
      .delete(`/location/${code}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.location.code).toBe(code)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Location.findOne({code}).then((location) => {
          expect(location).toNotExist()
          done()
        }).catch((e) => done(e))
      })
  })

  it('should return 404 if location not found', (done) => {
    var newCode = 'XL'

    request(app)
      .delete(`/location/${newCode}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if location code is invalid', (done) => {
    request(app)
      .delete('/location/123abc')
      .expect(404)
      .end(done)
  })
})

describe('PATCH /location/:code', () => {
  it('should update the location', (done) => {
    var code = locations[0].code
    var title = 'This should be the new title'

    request(app)
      .patch(`/location/${code}`)
      .send({title})
      .expect(200)
      .expect((res) => {
        expect(res.body.location.title).toBe(title)
        expect(res.body.location.code).toBe(code)
      })
      .end(done)
  })

  it('should return 404 if location not found', (done) => {
    var newCode = 'XL'
    var title = 'This should be the new text!!'

    request(app)
      .patch(`/location/${newCode}`)
      .send({title})
      .expect(404)
      .end(done)
  })
})
