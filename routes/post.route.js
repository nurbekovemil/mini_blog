const {Router} = require('express')
const Post = require('../model/Post')
const User = require('../model/User')
const Like = require('../model/Like')
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
// get all posts for home page
router.get('/posts', async(req, res) => {
  try {
    console.log(req.query)
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const post_count = await Post.countDocuments().exec()
    const all_posts = await Post.find({},{owner:0}).limit(limit*1).skip((page-1)*limit).sort({date: -1})
    res.json({post_count:post_count, all_posts: all_posts })
  }catch(e){
    res.json(e.message)
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

router.post('/like',authmiddleware, async (req, res) => {
  try {
    const {post_id} = req.body
    const isLiked = await Like.findOne({postid:post_id, userid: req.user.userId})
    const post = await Post.findOne({_id: post_id})
    
    if(isLiked){
      post.likes_count--
      await Like.deleteOne({postid:post_id, userid: req.user.userId})
      await post.save()
      return res.status(201).json(post)
    }
    const like = new Like({
      userid: req.user.userId,
      postid: post_id
    })
    post.likes_count++
    await post.save()
    await like.save()
    res.status(201).json(post)
  }catch(e) {
    res.status(400).json({message: e})
  }
})

router.get('/:id', async (req, res) => {
  try {

    postId = await Post.findById({_id: req.params.id})
    author = await User.findOne({_id: postId.owner}, {_id: 0, username: 1, profileImg: 1})
    const post = {
      _id: postId._id,
      title: postId.title,
      description: postId.description,
      date: postId.date,
      likes_count: postId.likes_count,
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