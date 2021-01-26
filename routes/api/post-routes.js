//// this file will hold the routes that will work with the Post model to perform CRUD operations

const router = require('express').Router();
// we included User in addition to Post since we'll need data from User for our foreign key constraints
// since each Post must belong to a single User
const { Post, User, Vote, Comment } = require('../../models');

// import Sequelize so we can sum upvotes and return that value when an upvote happens
const sequelize = require('../../config/connection');



// get all users
router.get('/', (req, res) => {
    console.log('======================');
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single Post by ID (findOne)
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
          'id', 
          'blog_contents', 
          'title', 
          'created_at'
    ],
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
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

// route to POST a Post
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', blog_contents: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      blog_contents: req.body.blog_contents,
      user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// // route to PUT an upvote on a post: /api/posts/upvote
// router.put('/upvote', (req, res) => {
//     // when user clicks the upvote icon, create an entry in the Vote table
//     // with the userID and postID of the vote
//     // 'upvote' is a custom static method created in models/Post.js
//   Post.upvote(req.body, { Vote })
//   .then(updatedPostData => res.json(updatedPostData))
//   .catch(err => {
//     console.log(err);
//     res.status(400).json(err);
//   });
// });

// route to update (PUT) a Post's title
router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title,
        blog_contents: req.body.blog_contents
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route to DELETE a Post
router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;