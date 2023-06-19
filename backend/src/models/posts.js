const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    caption: {
        type: String
    },
    img: {
        type:Buffer,
        required:true
    },
    likes:{
        type: Map,
        of: Boolean,
        default: new Map()
    },
    comments:[{
        username:{
            type: String,
            required: true
        },
        createdAt:{
            type:String,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

const Posts = mongoose.model('Posts', postSchema)

module.exports = Posts