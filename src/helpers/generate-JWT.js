const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '4h'
			},
			(error, token) => {
				if (error) {
					reject(`No se pudo generar el token: ${error}`);
				} else {
					resolve(token);
				}
			}
		)
	})

}



module.exports = generateJWT;