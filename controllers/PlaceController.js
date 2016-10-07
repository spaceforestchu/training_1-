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
    return new Promise(function(resolve, reject){
      Place.findById(id, function(err, place){
        if (err){
          reject(err)
          return
        }
        resolve(place)
        return
      })
    })
  },

  post: function(params){
    return new Promise(function(resolve, reject){
      Place.create(params, function(err, place){
        if(err){
          reject(err)
          return
        }
        resolve(place)
        return
      })
    })

  },

  put: function(id, params){

  }
}
