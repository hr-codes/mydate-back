const usersController = require('../controllers/usersController')

const routes = {
  post: async (req, res) => usersController.post(req, res),
  patch: async (req, res) => usersController.patch(req, res),
  getAll: async (req, res) => usersController.getAll(req, res),
  get: async (req, res) => usersController.get(req, res),
  delete: async (req, res) => usersController.delete(req, res)
}

module.exports = routes;