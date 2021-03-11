const {Router} = require('express')
const Post = require('../model/Post')
const User = require('../model/User')
const authmiddleware = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', authmiddleware, async (req, res) => {
  try {
    const {title, description} = req.body
    await Post.create({title, description, owner: req.user.userId})
    res.status(201).json({message: 'Запись успешно добавлен!'})
  } catch (e) {
    res.status(400).json({message: 'Ошибка при добавлени!'})
  }
})

router.get('/', authmiddleware, async (req, res) => {
  try {
    posts = await Post.find({ owner: req.user.userId}, {owner:0}).sort({date: -1})
    
    res.json({posts})
  } catch (e) {
    res.status(400).json({message: 'Ошибка при загрузке!'})
  }
})


router.put('/update',authmiddleware, async (req, res) => {
  try {
    const {title, description, _id} = req.body;
    await Post.findOneAndUpdate({_id: _id, owner: req.user.userId}, {title, description, date: new Date()})
    res.status(201).json({message: 'Запись успешно изменено!'})
  }catch(e) {
    res.status(500).json({message: 'Ошибка при изменении!'})
  }
})


router.get('/:id', async (req, res) => {
  try {

    postId = await Post.findById({_id: req.params.id})
    author = await User.findOne({_id: postId.owner}, {_id: 0, username: 1, profileImg: 1})
    const post = {
      title: postId.title,
      description: postId.description,
      date: postId.date,
      author
    }
    res.json(post)
  } catch (e) {
    res.status(400).json({message: 'Ошибка при загрузке!'})
  }
})
router.delete('/:id',authmiddleware, async (req, res) => {
  try {
    await Post.deleteOne({_id:req.params.id,owner: req.user.userId})
    res.status(201).json({message: 'Запись успешно удален!'})
  } catch (e) {
    res.status(400).json({message: 'Ошибка при удаление!'})
  }
})

module.exports = router