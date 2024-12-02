const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique:true
    },
      
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isPublished: {
        type: Boolean,
        default: false
    },
})

blogSchema.pre('save',function(next){
if(this.isModified('title')){
    this.slug = slugify(this.title,{ lower: true, strict: true })
}
next()
})


module.exports = mongoose.model('Blog', blogSchema)
