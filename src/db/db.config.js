
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

	} catch (err) {
		throw new Error(`Error al intentar conectar a Mongo DB Atlas: ${ err }`);
	}


}

module.exports = dbConnection;