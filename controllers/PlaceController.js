var Place = require('../models/Place')
var Promise = require('bluebird')
var Request = require('../utils/Request')

module.exports = {
  get: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Place.find(params, function(err, places){
        if (err) {
            reject(err);
            return
        }

        if (isRaw == true){
            resolve(places)
            return
        }

        var list = []
        for (var i = 0; i < places.length; i++){
          var place = places[i]
          list.push(place.summary())
        }
        resolve(list)
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
        resolve(place.summary())
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
        key: process.env.GOOGLE_MAP_API,
        address: address,
      }

      Request.get(url, geoParams, function(err, response){

        if (err) {
          reject(err)
          return
        }

         var results = response.results


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
           resolve(place.summary())
           return
         })
      })



//      superagent
//      .get(url)
//      .query(geoParams)
//      .set('Accept', 'text/json')
//      .end(function(err, response){
//        if (err) {
//            reject(err)
//            return
//        }
//
//        var results = response.body.results
//        var locationInfo = results[0]
//        var geometry = locationInfo.geometry
//        var latLng = geometry.location
//
// //       res.send(latLng)
//         params['geo'] = [latLng.lat, latLng.lng]
//
//         Place.create(params, function(err, place){
//           if(err){
//             reject(err)
//             return
//           }
//           resolve(place.summary())
//           return
//         })
//      })

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
