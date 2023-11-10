const express = require('express');
const router = express.Router();
const {BlogPost, User} = require('../../models');

router.get('/posts', async (req, res) => {
    try { 
        const blogPosts = await BlogPost.findAll({
            include: [{model: User, attributes: ['username']}],
        });

        res.json(blogPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('')
router.get('/posts/:id', async (req, res) => {