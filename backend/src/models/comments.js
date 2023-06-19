const mongoose = require('mogoose')

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'Posts'
    }
}, {
    timestamps: true
})

const Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments