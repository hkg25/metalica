var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

const commodity = require('./routes/commodityRoutes')
const counterparty = require('./routes/counterpartyRoutes')
const location = require('./routes/locationRoutes')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/commodity', commodity)
app.use('/counterparty', counterparty)
app.use('/location', location)

app.use("*",function(req,res,next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
      next();
    } else {
      return res.status(403).send({ 
          success: false, 
          message: 'Authorization failed ! Token is missing in headers' 
      });
  
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = {app}
