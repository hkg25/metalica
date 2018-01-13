const jwt = require('express-jwt')
// 5a361280da7de7514b33ad52
var jwks = require('jwks-rsa')
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://metallica-hkg.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://metallica-hkg.auth0.com/api/v2/',
  issuer: 'https://metallica-hkg.auth0.com/',
  algorithms: ['RS256']
})

module.exports = jwtCheck
