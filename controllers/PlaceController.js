var Place = require('../models/Place')
var Promise = require('bluebird')
var superagent = require('superagent');


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


      //1600+Amphitheatre+Parkway,+Mountain+View,+CA
      var address = params.address + ',' + params.city + ',' + params.state
      address = address.replace(' ', '+')

      var url = 'https://maps.googleapis.com/maps/api/geocode/json'

      var geoParams = {
        key: 'AIzaSyBHDx7B-4HbrEd3WU3trCsQ9blAabvW14E',
        address: address,
      }

     superagent
     .get(url)
     .query(geoParams)
     .set('Accept', 'text/json')
     .end(function(err, response){
       if (err) {
           reject(err)
           return
       }

       var results = response.body.results
       var locationInfo = results[0]
       var geometry = locationInfo.geometry
       var latLng = geometry.location

//       res.send(latLng)
        params['geo'] = [latLng.lat, latLng.lng]

        Place.create(params, function(err, place){
          if(err){
            reject(err)
            return
          }
          resolve(place)
          return
        })
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
