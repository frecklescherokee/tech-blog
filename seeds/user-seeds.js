const { User } = require('../models');

const userData = [
  {
    username: "Rick James",
    email: "imrickjames@bitch.com",
    password: "123456789"
  },
  {
    username: "Kim Kardashian",
    email: "imtheworst@badperson.com",
    password: "abcdefg"
  },
  {
    username: "Patrick Stewart",
    email: "awesome@theinternetlovesme.com",
    password: "makeitso"
  },
  {
    username: "Bernie Sanders",
    email: "bernie@burlingtoncoatfactory.com",
    password: "mittens"
  },


];

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;