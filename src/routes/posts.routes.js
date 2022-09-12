const router = require('express').Router();

//----------------------------Controllers------------------------//
const {
	getAllPosts,
	getPostById,
    newPost,
    newComment,
	editPost,
	deletePost
} = require( '../controllers/posts.controllers' );

router.get('/', getAllPosts)

router.get('/:_id', getPostById)

router.post( '/', newPost )

router.post( '/:id/new-comment', newComment )

router.put('/:id', editPost)

router.delete('/:id', deletePost)

module.exports = router;