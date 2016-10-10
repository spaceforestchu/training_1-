var Place = require('../models/Comment')
var Promise = require('bluebird')

module.exports = {

	get: function(params, isRaw){
		return new Promise(function(resolve, reject){
			Place.find(params, function(err, comments){
				if (err){
					reject(err)
					return
				}

				if (isRaw == true){
						resolve(comments)
						return
				}

				var list = []
				for (var i = 0; i < comments.length; i++) {
					var list = comments[i]
					list.push(list.summary())
				}


				resolve(list)
			})
		})
	},

	getById: function(id){
		return new Promise(function(resolve, reject){
			Place.findById(id, function(err, comment){
				if (err){
					reject(err)
					return
				}

				resolve(comment.summary())
			})
		})
	},

	post: function(params){
		return new Promise(function(resolve, reject){
			Comment.create(params, function(err, comment){
				if (err){
					reject(err)
					return
				}

				resolve(comment.summary())
			})
		})
	},

	put: function(id, params){
		return new Promise(function(resolve, reject){
			Comment.findByIdAndUpdate(id, params, {new:true}, function(err, comment){
				if (err){
					reject(err)
					return
				}

				resolve(comment.summary())
			})
		})

	}

}
