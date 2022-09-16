//----------------------------Models------------------------//
const Post = require('../models/post.model');

const getAllPosts = async (req, res) => {
	const posts = await Post.find({ state: true })
		.select({ _id: 1, categorie: 1, title: 1, img: 1, author:1})
		.populate('author', { username: 1 });
	return res.json({ posts })
}

const getPostById = async (req, res) => {
	const { _id } = req.params;
	const post = await Post.findById({ _id, state: true })
		.populate('author', { username: 1, _id: 0 })
		.populate('comments.author', {username: 1, _id: 0, image: 1});

	if (!post) {
		return res.status(400).json({
			ok: false,
			post
		})
	}

	return res.json({
		ok: true,
		post
	})
}

const newPost = async (req, res) => {
	try {
		const { categorie, title, text } = req.body;
		// const newPost = new Post({ categorie, title, text, img });
		const newPost = { categorie, title, text }

		newPost.author = req.uid;

		if(!req.files){
			console.log("File not found")
		} else {
			console.log(req.files.img)
		}
		console.log(req.headers)
		console.log(newPost)

		// await newPost.save()
		return res.json({
			ok: true,
			msg: "Post agregado con exito",
			newPost
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error al agregar el post"
		});
	}

}

const newComment = async (req, res) => {
	try {
		const { _id } = req.params;
		const { text } = req.body;
		const comment = { text };

		comment.author = req.uid;

		const post = await Post.findById(_id);

		post.comments.push(comment);

		await post.save();

		return res.json({
			ok: true,
			msg: "Comentario agregado con exito",
			comments: post.comments
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error al agregar el comentario"
		});
	}
}

const editPost = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, text } = req.body;

		const post = await Post.findById(id);
		if (!post) {
			return res.status(400).json({
				ok: false,
				msg: "El post que desea editar no existe"
			})
		}

		if (title) post.title = title;
		if (text) post.text = text;

		await post.save();

		res.json({
			ok: true,
			msg: "El post fue editado con exito",
			post: {
				title: post.title,
				text: post.text
			}
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error al editar el post"
		});
	}
}

const deletePost = async (req, res) => {

	try {
		const { id } = req.params;
		const post = await Post.findById(id);
		if (!post) {
			return res.status(400).json({
				ok: false,
				msg: "El post que desea eliminar no existe"
			})
		}

		post.state = false;

		await post.save();

		return res.json({
			ok: true,
			msg: `El post '${post.title}' fue eliminado con exito`
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Error al eliminar el post"
		});
	}
}

module.exports = {
	getAllPosts,
	getPostById,
	newPost,
	newComment,
	editPost,
	deletePost
}