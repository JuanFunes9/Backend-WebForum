const app = require('./app');

const dbConnection = require('./db/db.config');

const PORT = process.env.PORT || 8080;

const main = () => {
	try {
		dbConnection()
			.then( () => console.log( `Connection to Mongo DB Atlas success!` ) )



		app.listen(PORT, () => console.log(`Server on PORT: ${PORT}`));
	} catch (error) {
		console.log(`Error al intentar iniciar el servidor: ${error}`);
	}
}

main();