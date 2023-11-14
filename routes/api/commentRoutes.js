const express = require('express');
const router = express.Router();
const { Comment } = require('../../models/Comment');
const { User } = require('../../models/User');



router.get('/comments', async (req, res) => {
    try {
      const comments = await Comment.findAll({
        include: [{ model: User, attributes: ['username'] }],
      });
  
      res.json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { blog_post_id: req.params.postId },
      include: [{ model: User, attributes: ['username'] }],
    });

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/posts/:postId/comments', async (req, res) => {
    try {
      const { commentText, userId } = req.body;
  
      const newComment = await Comment.create({
        comment_text: commentText,
        user_id: userId,
        blog_post_id: req.params.postId,
      });
  
      res.json(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.post('/posts/:postId/comments', async (req, res) => {
  try {
    const { commentText, userId } = req.body;

    const newComment = await Comment.create({
      comment_text: commentText,
      user_id: userId,
      blog_post_id: req.params.postId,
    });

    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/comments/:id', async (req, res) => {
  try {
    const deletedCommentCount = await Comment.destroy({
      where: { id: req.params.id },
    });

    if (deletedCommentCount === 0) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;