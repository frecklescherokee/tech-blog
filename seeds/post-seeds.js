const { Post } = require('../models');

const postData = [
  {
    title: "Rick James is a genius",
    blog_contents: "I'm rick James, bitch",
    user_id: "1"
  },
  {
    title: "Elon Musk for president?",
    blog_contents: "I like space and a hyperloop",
    user_id: "2"
  },
  {
    title: "Qanon was right all along",
    blog_contents: "just keep trusting the plan",
    user_id: "3"
  },
  {
    title: "Little Orphan Annie's secret message",
    blog_contents: "Don't forget to drink your ovaltine",
    user_id: "4"
  },


];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;