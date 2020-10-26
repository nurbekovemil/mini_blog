const express = require('express')
const path = require('path')
const config = require('config')
const PORT = config.get('PORT') || 5000;
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors())
app.use('/public', express.static('public'));

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/user', require('./routes/user.route'))
app.use('/api/post', require('./routes/post.route'))

if(process.env.NODE_ENV = 'production'){
	app.use('/', express.static(path.join(__dirname, 'client', 'build')))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const MongoDB = async () => {
	try {
		await mongoose.connect(config.get('MONGOURI'), 
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
		app.listen(PORT, () => console.log(`server started on port ${PORT}`))
	}catch (e) {
		console.log('server error', e.message)
		process.exit(1)
	}
}
MongoDB()
