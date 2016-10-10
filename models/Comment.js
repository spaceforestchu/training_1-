var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
	text: {type:String, trim:true, required:true, default:''},
	profile: {type:String, required:true, default:''}, // id number of the profile
	timestamp: {type:Date, default:Date.now}
})

module.exports = mongoose.model('CommentSchema', CommentSchema)
