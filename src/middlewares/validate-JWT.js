const jwt = require('jsonwebtoken');
//----------------------------Model------------------------//
const User = require('../models/user.model');

const validateJWT = async (req, res, next) => {

  let token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({
      ok: false,
      msg: "No envio un Token valido (no hay token)"
    })
  }

  try {
    token = token.split(' ')[1];

    const { uid } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.uid = uid;
    req.user = await User.findById(uid, {
      attributes: {
        exclude: ['password']
      }
    })

    if (!req.user) {
      return res.status(403).json({
        ok: false,
        msg: "No envio un Token valido"
      })
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      error: "No envio un token valido."
    })
  }

}

module.exports = validateJWT;