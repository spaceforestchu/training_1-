var mongoose = require('mongoose')

    var PlaceSchmema = new mongoose.Schema({
      name: {type: String, default: ''},
      description: {type: String, default: ''},
      address: {type: String, default: ''},
      type: {type: String, default: ''},
      city: {type: String, default: ''},
      state: {type: String, default: ''},
      zip: {type: String, default: ''},
      timestamp: {type:Date, default: Date.now}
    })

module.exports = mongoose.model('PlaceSchmema', PlaceSchmema)
