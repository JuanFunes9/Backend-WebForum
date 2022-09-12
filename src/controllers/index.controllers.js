const path = require('path');

const getIndex = (req, res) => {



	res.sendFile(path.join(process.cwd() + '/src/public/index.html'))
}

module.exports = {
	getIndex
}