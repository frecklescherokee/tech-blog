const { Comment } = require('../models');

const commentData = [
  {
    comment_text: "I like the wizard of oz",
    user_id: "4",
    post_id: "1"
  },
  {
    comment_text: "Funny post for a wanker",
    user_id: "3",
    post_id: "2"
  },
  {
    comment_text: "I'm bloody British, ain't I?",
    user_id: "2",
    post_id: "3"
  },
  {
    comment_text: "comments have no meaning",
    user_id: "1",
    post_id: "4"
  },


];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;