var mongoose = require('mongoose')

    var PlaceSchema = new mongoose.Schema({
      name: {type: String, default: ''},
      description: {type: String, default: ''},
      address: {type: String, default: ''},
      type: {type: String, default: ''},
      city: {type: String, default: ''},
      state: {type: String, default: ''},
      zip: {type: String, default: ''},
      geo: {
        type: [Number],
        index: '2d'
      },
      timestamp: {type:Date, default: Date.now}
    })

module.exports = mongoose.model('PlaceSchema', PlaceSchema)
