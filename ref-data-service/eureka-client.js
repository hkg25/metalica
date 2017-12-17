const Eureka = require('eureka-js-client').Eureka

const client = new Eureka({
  instance: {
    app: 'ref-data-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: `http://localhost:${process.env.PORT}`,
    healthCheckUrl: `http://localhost:${process.env.PORT}/health`,
    port: {
      '$': process.env.PORT,
      '@enabled': 'true'
    },
    vipAddress: 'matellica.com/ref-data-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    host: `${process.env.EUREKA_SERVER_HOST}`,
    port: 8761,
    servicePath: '/eureka/apps/'
  }
})
client.logger.level('debug')

module.exports = client
