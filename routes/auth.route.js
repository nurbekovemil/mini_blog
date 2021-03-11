const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult } = require('express-validator')
const User = require('../model/User')
const authmiddleware = require('../middleware/auth.middleware')
const router = Router()


router.post('/register', [
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Длина меньше чем 6 символа').isLength({min: 6})
	], async (req, res) => {
	try {
		const {username, email, password} = req.body
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.status(400).json({
				errors: errors,
				message: 'Некорректные данные!'
			})
		}
		const checkUser = await User.findOne({email})
		if(checkUser){
			return res.status(400).json({message: 'Такой пользователь уже есть!'})
		}
		const hashPass = await bcrypt.hash(password, 12)
		const defaultImg = req.protocol+'://'+req.get('host')+'/public/default/default_profile.jpg'
		const user = new User({
			username,
			email,
			password: hashPass,
			profileImg: defaultImg
		})
		await user.save()
		const token = await jwt.sign(
			{userId: user.id},
			config.get('secret'),
			{expiresIn: '1h'},
			)
		res.status(201).json({token, user, message: 'Регистрация прошло успешно!'})
		errors = []
	} catch (e){
		res.status(500).json({message:'Ошибка при регистрации'})
	}
})


router.post('/login', [
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Некорректный пароль').isLength({min:6})
	], async(req, res) => {
	try {
		const {email, password} = req.body
		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.status(400).json({
				errors: errors,
				message: 'Некорректные данные'
			})
		}
		const checkUser = await User.findOne({email})
		if(!checkUser) {
			return res.status(400).json({message: 'Пользователь не найден!'})
		}

		const isMatch =  await bcrypt.compare(password, checkUser.password)
		if(!isMatch) {
			return res.status(400).json({message: 'Не верный пароль введите еще раз!'})
		}

		const token = await jwt.sign(
			{userId: checkUser.id},
			config.get('secret'),
			{expiresIn: '1h'},
			)
		res.json({token, user: checkUser})
	} catch (e){
		res.status(500).json({message:'Ошибка при авторизации!'})
	}
})

router.get('/auth', authmiddleware, async(req, res) => {
	try {
		const checkUser = await User.findOne({_id: req.user.userId}, {_id: 0, password: 0})
		const token = await jwt.sign(
				{userId: req.user.userId},
				config.get('secret'),
				{expiresIn: '1h'},
			)
		res.json({
			token,
			user: checkUser
		})
	} catch (e){
		res.status(500).json({message:'Ошибка при авторизации'})
	}
})




module.exports = router