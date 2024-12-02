const express = require('express')
const app = express()

require('./Database/Connection')

const port = 5000;
const BlogRoute = require('./Routes/BlogRoute')

app.use(express.json())
app.use('/api/blogs', BlogRoute)

app.listen(port,()=>{console.log(`App started Successfully at port ${port}.`)})