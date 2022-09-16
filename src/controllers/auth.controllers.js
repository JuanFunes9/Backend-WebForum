const path = require('path');
const bcryptjs = require('bcryptjs');
//----------------------------Models------------------------//
const User = require('../models/user.model');
//----------------------------Helpers------------------------//
const generateJWT = require('../helpers/generate-JWT');

const logUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		//verificar si el usuario existe
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({
				ok: false,
				msg: "Email incorrecto",
				token: null
			})
		}
		//verificar que la PW sea correcta
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(401).json({
				ok: false,
				msg: "Contraseña incorrecto",
				token: null
			})
		}
		//generar un Token de Acesso y devolver
		const token = await generateJWT(user._id);

		res.json({
			ok: true,
			msg: "loging correcto",
			user: {
				image: user.image,
				username: user.username,
				email: user.email
			},
			token: `Bearer ${token}`
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok:false,
			msg: "Algo salio mal. Hable con el administrador.",
			token: null
		});
	}
}

const registerUser = async (req, res) => {
	const { email, username, password } = req.body;
	const newUser = new User({ email, username, password });

	//Encriptar PW:
	const salt = bcryptjs.genSaltSync();
	newUser.password = bcryptjs.hashSync(newUser.password, salt);

	//Guardar nuevo User en DB:
	const resp = await newUser.save();

	//generar un Token de Acesso y devolver
	const token = await generateJWT(resp._id);

	res.json({
		ok: true,
		user: {
			image: resp.image,
			username,
			email
		},
		token: `Bearer ${token}`
	})
}

module.exports = {
	logUser,
	registerUser
}