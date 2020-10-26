const {Router} = require('express')
const User = require('../model/User')
const authmiddleware = require('../middleware/auth.middleware')
const multer = require('multer')
const fs = require("fs")
const router = Router()

const storage = multer.diskStorage({
	destination: (req, file, cb) =>{
		cb(null, './public/')
	},
	filename: (req, file, cb) =>{
		const filename = file.originalname.toLowerCase().split(' ').join('-')
		cb(null, Date.now() + '-' +filename)
	}
})

let upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) =>{
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
			cb(null, true);
		} else {
				cb(null, false);
				return cb(new Error('Только .png, .jpg and .jpeg форматы разрешены!'));
		}
	}
})
router.post('/update-profile', authmiddleware, upload.single('profileImg'), async (req, res, next) => {
	try {
		const url = req.protocol+'://'+req.get('host')
		const oldPicture = await User.findOne({_id: req.user.userId},{profileImg: 1, _id:0})
		const linkPicture = `public/${oldPicture.profileImg.split('/').pop()}`
		fs.stat(linkPicture, (err, stat) => {
			if(stat){
				fs.unlink(linkPicture, (err) => {
					if(err) throw err
				})
			}
		})
		const profileImg =  url + '/public/' + req.file.filename
		const user = await User.findByIdAndUpdate({_id: req.user.userId}, {profileImg: profileImg}, {new: true})
		res.status(201).json({picture: user.profileImg, message: 'Аватар успешно обновлен!'})
	} catch(e) {
		res.status(500).json({message: 'Ошибка при обновление аватара!', e})
	}
})

router.post('/update',authmiddleware, async (req, res) => {
	try {
		const {username, email, about} = req.body
		const user = await User.findOneAndUpdate({_id: req.user.userId},{username, email,  about},{new: true})
		res.status(201).json({
			user: user,
			message: 'Данные пользователя успешно обновлены!'
		})
	} catch (e){
		res.status(500).json({message: 'Ошибка при обновления данных пользователя!'})
	}
})

module.exports = router