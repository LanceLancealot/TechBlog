const { BlogPost, User } = require('../models');

const blogController = {
  // Get all blog posts
  getAllPosts: async (req, res) => {
    try {
      const blogPosts = await BlogPost.findAll({
        include: [{ model: User, attributes: ['username'] }],
      });

      res.json(blogPosts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get a specific blog post by ID
  getPostById: async (req, res) => {
    try {
      const blogPost = await BlogPost.findByPk(req.params.id, {
        include: [{ model: User, attributes: ['username'] }],
      });

      if (!blogPost) {
        res.status(404).json({ error: 'Blog post not found' });
        return;
      }

      res.json(blogPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Create a new blog post
  createPost: async (req, res) => {
    try {
      const { title, content, userId } = req.body;

      const newPost = await BlogPost.create({
        title,
        content,
        user_id: userId, // Assuming your BlogPost model has a user_id foreign key
      });

      res.json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update a blog post by ID
  updatePost: async (req, res) => {
    try {
      const { title, content } = req.body;

      const updatedPost = await BlogPost.update(
        { title, content },
        { where: { id: req.params.id } }
      );

      if (updatedPost[0] === 0) {
        res.status(404).json({ error: 'Blog post not found' });
        return;
      }

      res.json({ message: 'Blog post updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete a blog post by ID
  deletePost: async (req, res) => {
    try {
      const deletedPostCount = await BlogPost.destroy({
        where: { id: req.params.id },
      });

      if (deletedPostCount === 0) {
        res.status(404).json({ error: 'Blog post not found' });
        return;
      }

      res.json({ message: 'Blog post deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = blogController;
