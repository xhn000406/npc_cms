const Mock = require('mockjs')

module.exports = (app) => {
  app.post('/api/core/login', (req, res) => {
    res.send(Mock.mock({
      'status': 200,
      'data|32': /[a-z0-9]/
    }))
  })
}

