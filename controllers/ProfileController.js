var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcrypt')


module.exports = {
  get: function(params){
    return new Promise(function(resolve, reject){
      Profile.find(params, function(err, profiles){
        if (err) {
            reject(err)
            return
        }
        resolve(profiles)
      })
    })
  },

  getById: function(id){
    return new Promise(function(resolve, reject){
      Profile.findById(id, function(err, profile){
        if (err){
          reject(err)
          return
        }
        resolve(profile)
        return
      })
    })

  },

  post: function(params){
    return new Promise(function(resolve, reject){

      var password = params.password
      params['password'] = bcrypt.hashSync(password, 10)
      
      Profile.create(params, function(err, profile){
        if(err){
          reject(err)
          return
        }
        resolve(profile)
        return
      })
    })

  },

  put: function(id, params){
    return new Promise(function(resolve, reject){
      Profile.findByIdAndUpdate(id, params, {new: true }, function(err, profile){
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
