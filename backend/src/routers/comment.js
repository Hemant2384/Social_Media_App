const express = require('express')
const router = new express.Router()
const Comments = require('../models/comments')
const auth = require('../middleware/authenticate')

router.post('/comment/:id', auth, async (req, res) => {

})

router.get('/comment/:id', async (req, res) => {

})

router.delete('/comment/:id', auth, async (req, res) => {
    
})