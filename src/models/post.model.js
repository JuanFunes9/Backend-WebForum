const { Schema, model } = require('mongoose');

const PostSchema = Schema({
	categorie: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	img: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',            //Con esto creamos una relacion entre las 2 colecciones.
		required: true
	},
	comments: {
		type: [{
			author: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			text: {
				type: String
			}
		}, {timestamps: true}]
	},
	state: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true
})

module.exports = model('Post', PostSchema);