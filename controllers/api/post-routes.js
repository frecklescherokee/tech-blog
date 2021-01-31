//// this file will hold the routes that will work with the Post model to perform CRUD operations

const router = require('express').Router();
// we included User in addition to Post since we'll need data from User for our foreign key constraints
// since each Post must belong to a single User
const { Post, User, Vote, Comment } = require('../../models');

// import Sequelize so we can sum upvotes and return that value when an upvote happens
const sequelize = require('../../config/connection');

const withAuth = require('../../utils/auth');



// get all posts
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
    .then(dbPostData => {
      // pass a single post object into the homepage template
      console.log(dbPostData[0]);
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single Post by ID (findOne)
router.get('/:id', withAuth, (req, res) => {
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
router.post('/', withAuth, (req, res) => {
    // expects {title: 'Taskmaster goes public!', blog_contents: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      blog_contents: req.body.blog_contents,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// // route to PUT an upvote on a post: /api/posts/upvote
// router.put('/upvote', (req, res) => {
//   // make sure the session exists first
//   if (req.session) {
//     // pass session id along with all destructured properties on req.body
//     Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
//       .then(updatedVoteData => res.json(updatedVoteData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   }
// });

// route to update (PUT) a Post's title or contents
router.put('/:id', withAuth, (req, res) => {
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
router.delete('/:id', withAuth, (req, res) => {
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