const express = require('express');
const router = express.Router();
const {BlogPost} = require('../../models/BlogPost');
const { User } = require('../../models/User');


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

router.get('/posts/:id', async (req, res) => {
    try{
        const blogPost = await BlogPost.findByPk(req.params.id,{
            include: [{model: User, attributes: ['username']}],
        });

        if(!blogPost){
            res.status(404).json({error: 'No blog post found with this id!'});
            return;
        }
        res.json(blogPost);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: ' Internal Server Error'});
    }
});

router.post('/posts', async (req, res) => {
    try{
        const{title, content, userId} = req.body;

        const newPost = await BlogPost.creat({
            title,
            content,
            user_id: userId
        });

        res.json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.put('/posts/:id', async (req, res) => {
    try{
        const{title,content} = req.body;

        const updatedPost = await BlogPost.update(
            {title, content},
            {where: {id: req.params.id}}
        );
        if(updatedPost[0] === 0) {
            res.status(404).json({error: 'BlogPost not Found'});
            return;
        }
        res.json({message: 'Blog Post Updated Successfully!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.delete('/posts/:id', async (req, res) => {
    try{
        const deletedPostCount = await BlogPost.destroy({
            where: { id: req.params.id},
        });

        if (deletedPostCount === 0){
            res.status(404).json({error: 'Blog Post not Found'});
            return;
        }
        res.json({message: 'Blog Post Deleted Successfully!'});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;
