//// Much like the API folder's index.js file that collects the endpoints and prefixes them, 
//// here we are collecting the packaged group of API endpoints and prefixing them with the path /api.
//// Now when we import the routes to server.js, 
//// they'll already be packaged and ready to go with this one file

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;