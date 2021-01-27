//// this file will serve as a means to collect all API routes and 
//// package them for export to the rest of the program

const router = require('express').Router();

// Remember how in user-routes.js we didn't use the word users in any routes? 
// That's because in this file we take those routes and 
// implement them to another router instance, prefixing them with the path /users at that time.
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;