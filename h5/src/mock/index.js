const Mock = require('mockjs')

module.exports = (app) => {
  app.post('/api/core/login', (req, res) => {
    res.send(Mock.mock({
      'data': {
        'token|32': /[a-zA-Z0-9]/
      }
    }))
  })
}

