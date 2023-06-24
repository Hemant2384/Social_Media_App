const express = require('express')
const router = new express.Router()
const User = require('../models/users')
const auth = require('../middleware/authenticate')
const multer = require('multer')
const sharp = require('sharp')
const sendEmail = require('../utils/sendEmail')
const Users = require('../models/users')
const crypto = require('crypto')

router.post('/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        console.log(token);
        res.send({user,token})
    } catch (e) {
        res.status(400).send(e)
    } 
})

router.post('/register', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }  
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Logged out Succesfully')
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send('Logged out of all devices') 
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/user/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/user/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'dob']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send('Invalid Request')
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.status(205).send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})

router.delete('/user/me', auth, async (req, res) => {
    try {
        await req.user.deleteOne()
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {  //match takes regex .jpg || .jpeg//$-> means at end
            return cb(new Error('Please povide image')) 
        }
        cb(undefined, true) 
    }
})

router.post('/user/me/profilePic', auth, upload.single('profilePic'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({
        width: 250,
        height: 250
    }).jpeg().toBuffer() 
    req.user.profilePic = buffer
    await req.user.save()
    res.send('Image uploaded successfully')
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/user/:id/profilePic', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar) {
            throw new Error('Image not found!')
        }

        res.set('Content-Type', 'image/jpeg') 
        res.send(user.avatar)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/user/me/profilePic', auth, async (req, res) => {
    req.user.profilePic = undefined
    await req.user.save()
    res.send('Image deleted successfully')
})

router.post('/resetPassword', async (req, res) => {
    try {
        const user = await Users.findOne({email: req.body.email})
        if(!user) {
            return res.status(400).send('User not found')
        }
        const subject = 'Password reset Link'
        const token = user.getResetPasswordToken()  // Get new token for verification
        const link = `${process.env.URL}/reset-password?token=${token}`  //Create link using token
        const text = `This is your password reset link ${link}`
        const sent = await sendEmail(user.email, subject, text)  // Send email, subject and password reset link to sendEmail()
        if (!sent) {
            throw new Error('Unable to send email')
        }
        res.send('Password reset link sent to your email')
    } catch (e) {
        res.status(500).send(e)
    }   
})

router.post('/resetPassword/:token', async (req, res) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")
    try {
        const user = await Users.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
          });
      
          if (!user) {
            return res.status(400).send('Invalid token or session timed out')
          }
      
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
          user.tokens = []
          await user.save()
          const token = await user.generateAuthToken()
          res.send({user,token})
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router