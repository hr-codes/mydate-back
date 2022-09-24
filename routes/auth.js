const authController = require('../controllers/authController');

const routes = {
  signIn: async (req, res) => authController.signIn(req, res),
  logout: async (req, res) => authController.logout(req, res)
}

module.exports = routes;