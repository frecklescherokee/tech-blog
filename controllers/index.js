//// Much like the API folder's index.js file that collects the endpoints and prefixes them, 
//// here we are collecting the packaged group of API endpoints and prefixing them with the path /api.
//// Now when we import the routes to server.js, 
//// they'll already be packaged and ready to go with this one file

const router = require('express').Router();



// merge the dashboard router module into the rest of the app with these 2 lines:
const dashboardRoutes = require('./dashboard-routes.js');
router.use('/dashboard', dashboardRoutes);

// merge the homepage router module into the rest of the app with these 2 lines:
const homeRoutes = require('./home-routes.js');
router.use('/', homeRoutes);

// merge the api router module into the rest of the app with these 2 lines:
const apiRoutes = require('./api');
router.use('/api', apiRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;