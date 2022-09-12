const router = require('express').Router();

//----------------------------Controllers------------------------//
const {
	getAllUsers,
	getUserById,
	editUser,
	deleteUser
} = require('../controllers/users.controllers');



router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.put('/:id', editUser);

router.delete('/:id', deleteUser);


module.exports = router;