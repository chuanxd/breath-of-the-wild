var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  mapToken: '"AIzaSyApzrtY9V_UzgWxbpwFFQUlfwtFmHgc5sU"'
})
