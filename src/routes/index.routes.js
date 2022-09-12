const router = require( 'express' ).Router();

//----------------------------Controllers------------------------//
const {
	getIndex
} = require( '../controllers/index.controllers' ); 


router.get('/', getIndex);

module.exports = router;