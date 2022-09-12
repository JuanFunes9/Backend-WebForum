const router = require( 'express' ).Router();

//----------------------------Controllers------------------------//
const {
	logUser,
	registerUser
} = require( '../controllers/auth.controllers' );

router.post( '/login', logUser );

router.post( '/register', registerUser );


module.exports = router;