const router = require('express').Router();
//----------------------------Middlewares------------------------//
const validateJWT = require('../middlewares/validate-JWT');


//----------------------------Controllers------------------------//
const {
	getAllPosts,
	getPostById,
    newPost,
    newComment,
	editPost,
	deletePost
} = require( '../controllers/posts.controllers' );

router.get('/', [
], getAllPosts)

router.get('/:_id', getPostById)

router.post( '/', [
	validateJWT
], newPost )

router.post( '/:_id/new-comment', [
	validateJWT
], newComment )

router.put('/:id', editPost)

router.delete('/:id', deletePost)

module.exports = router;