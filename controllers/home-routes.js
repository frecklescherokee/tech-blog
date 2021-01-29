const router = require('express').Router();

// want to use Post.findAll() in other parts of this app
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// get all posts
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
      // which columns we want
        attributes: [
            'id', 
            'blog_contents', 
            'title', 
            'created_at'
    ],
      // join to the User table, notice it is an array of objects
      // if you were joining to another table, that would be another object in the array
        include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template
        // console.log(dbPostData[0]);
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route for login page
router.get('/login', (req, res) => {
    // if user is logged in, redirect to home page
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;