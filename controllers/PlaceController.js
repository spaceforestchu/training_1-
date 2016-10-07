var Place = require('../models/Place')
var Promise = require('bluebird')

module.exports = {
  get: function(params){
    return new Promise(function(resolve, reject){
      Place.find(params, function(err, Places){
        if (err) {
            reject(err);
            return
        }
        resolve(Places)
      })
    })
  },

  getById: function(id){

  },

  post: function(params){

  },

  put: function(id, params){

  }
}
