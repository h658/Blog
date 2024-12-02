// const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE)
// .then(()=>console.log('DB connected successfully.'))
// .catch((err)=>console.log('DB connection error',err))

const mongoose = require('mongoose');
const blogSchema = require('../Models/BlogModel')

mongoose.connect('mongodb://localhost:27017/BlogDB')
 .then(()=>{console.log('DB connected successfully.')})
 .catch((err)=>console.log('DB connection error',err))

