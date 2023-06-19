const express = require('express')
const router = new express.Router()
const Posts = require('../models/posts')
const auth = require('../middleware/authenticate')

router.post('/like/:id', auth, async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        if(!post) {
            return res.status(404).send('Post not found')
        }
        const isLiked = post.likes.get(req.user.username)
        console.log(isLiked)
        if(isLiked) {
            post.likes.delete(req.user.username)
        } else {
            post.likes.set(req.user.username, true)
        }
        await post.save()
        res.send(post)
    } catch (e) {
        res.status(400).send('Something went wrong')
    }
})

module.exports = router