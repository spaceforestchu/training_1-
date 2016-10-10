var Place = require('../models/Place')
var Promise = require('bluebird')

module.exports = {
  get: function(params, isRaw){
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

      //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBHDx7B-4HbrEd3WU3trCsQ9blAabvW14E
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
    return new Promise(function(resolve, reject){
      Place.findByIdAndUpdate(id, params, {new: true }, function(err, profile){
        if(err){
          reject(err)
          return
        }
        resolve(profile)
        return
      })
    })
  }
}
