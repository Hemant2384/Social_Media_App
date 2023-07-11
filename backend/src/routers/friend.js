const express = require('express')
const router = new express.Router()
const Users = require('../models/users')
const auth = require('../middleware/authenticate')

router.post('/addFriend', auth, async (req, res) => {  // send or unsend friend request  
    try{
        const sendTo = await Users.findOne({username:req.body.username})
        const found = req.user.sentRequest.find({username: req.body.username})
        if(found === undefined) {
            req.user.sentRequest = req.user.sentRequest.concat({username: req.body.username})
            await req.user.save()
            sendTo.recievedRequests = sendTo.recievedRequests.concat({username: req.user.username})
            await sendTo.save()

            res.send('Request sent successfully')
        } else {
            req.user.sentRequest = req.user.sentRequest.filter((user) => {
                return user.username !== req.body.username
            })
            await req.user.save()
            sendTo.recievedRequests = sendTo.recievedRequests.filter((user) => {
                return user.username !== req.user.username
            })
            await sendTo.save()
            res.send('Request removed successfully')
        }
    } catch(e) {
        res.status(400).send()
    }
})

router.post('requests/:accept', auth, async(req, res) => {  // accept or remove request 
    try {
        const sentBy = await Users.findOne({username: req.body.username})
        req.user.recievedRequests = req.user.recievedRequests.filter((user) => {
            return user.username !== req.body.username
        })
        sentBy.sentRequests = sentBy.sentRequests.filter((user) => {
            return user.username !== req.user.username
        })
        if(req.params.accept) {  //request accepted
            req.user.friends = req.user.friends.concat({username: sentBy.username})
            sentBy.friends = sentBy.friends.concat({username: req.user.username})
            res.send('Request added successully')
        } else {
            res.send('Request removed')
        }
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/removeFriend', auth, async(req, res) => {  // remove friend

})

router.get('requests', auth, async(req, res) => {  // all requests

})

router.get('/friends', auth, async (req, res) => {  // get all friends of user

})

// If deleting a user then its username should be deleted from all other user's friend database

module.exports = router