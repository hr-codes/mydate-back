const profileController = require('../controllers/profileController');

const routes = {
  create: async (req, res) => profileController.create(req, res),
  getAll: async (req, res) => profileController.getAll(req, res),
  get: async (req, res) => profileController.get(req, res),
}

module.exports = routes;
