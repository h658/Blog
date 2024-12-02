
const { default: slugify } = require('slugify');
const blogSchema = require('../Models/BlogModel')

//Create a new blog
exports.newBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const savedBlog = await blogSchema.create({
            title, content
        });
        res.status(200).json(savedBlog)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//publish a drafted blog
exports.toPublishBlog = async (req, res) => {
    try {
        let Blog = await blogSchema.findOneAndUpdate({ slug: req.params.slug },
            {
                isPublished: true
            }, { new: true }
        )
        if (!Blog) { return res.status(404).json({ message: 'Blog not found' }) }

        res.status(200).json(Blog)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//unpublish a drafted blog
exports.toUnpublishBlog = async (req, res) => {
    try {
        let Blog = await blogSchema.findOneAndUpdate({ slug: req.params.slug },
            {
                isPublished: false
            }, { new: true }
        )
        if (!Blog) { return res.status(404).json({ message: 'Blog not found' }) }

        res.status(200).json(Blog)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//edit a blog
exports.editBlog = async (req, res) => {
    try {
        let { title, content } = req.body
        let updatedData = { content }
        if (title) {
            updatedData.title = title
            updatedData.slug = slugify(title, { lower: true, strict: true })
        }

        let updatedBlog = await blogSchema.findOneAndUpdate({ slug: req.params.slug },
            updatedData,
            { new: true }
        )

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' })
        }

        res.status(200).json(updatedBlog)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//get all blogs
exports.allBlogs = async (req, res) => {
    try {
        let Blogs = await blogSchema.find({}, 'title slug createdAt isPublished')
        res.status(200).json(Blogs)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//get particular blog
exports.blog = async (req, res) => {
    try {
        let Blog = await blogSchema.findOne({ slug: req.params.slug })
        if (!Blog) {
            res.status(404).json({ message: 'Blog not found' })
        }
        res.status(200).json(Blog)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//delete a blog 
exports.deleteBlog = async (req, res) => {
    try {
        let Blog = await blogSchema.findOneAndDelete({ slug: req.params.slug });

        if (!Blog) {
            return res.status(404).json({ message: 'Blog not found' })
        }

        res.status(200).json({ message: 'Blog deleted successfully!' })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}








