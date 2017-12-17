const Eureka = require('eureka-js-client').Eureka

const client = new Eureka({
  instance: {
    app: 'myapp',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: `http://localhost:${process.env.port}`,
    healthCheckUrl: `http://localhost:${process.env.port}/health`,
    port: {
      '$': process.env.port,
      '@enabled': 'true'
    },
    vipAddress: 'myvip',
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
