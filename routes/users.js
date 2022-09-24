const User = require('../models/User')
const bcrypt = require("bcrypt")

const routes = {
  post: async (req, res) => {
    const { username, name, email, password } = req.body;

    if (!username && !name && !email && !password) {
      res.status(400).json({ message: 'required fields not passed.' })

      return;
    }

    const data = {
      username,
      name,
      email,
      password
    };

    try {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, async (err, hash) => {
          data.password = hash;

          const user = await User.create(data);

          res.status(201).json({
            data: {
              id: user.id,
            },
            message: 'User created successfully.'
          });
        });
      })
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  patch: async (req, res) => {
    const { id } = req.params;

    const { username, name, email, password } = req.body;

    const data = {
      username,
      name,
      email,
      password
    };

    try {
      const user = await User.updateOne({ _id: id }, data)

      if (!user.matchedCount) {
        res.status(422).json({
          data: {},
          message: 'user not found',
        });

        return;
      }

      console.log(user)

      res.status(200).json(user)

    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await User.find();

      res.status(200).json({
        data: users,
        message: 'success',
      })
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  get: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findOne({ _id: id })

      if (!user) {
        res.status(422).json({
          data: {},
          message: 'user not found',
        });

        return
      }

      res.status(200).json({
        data: user,
        message: 'success',
      })
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id })

    if (!user) {
      res.status(422).json({
        data: {},
        message: 'user not found',
      });
    }

    try {
      const deleted = await User.deleteOne({ _id: id });

      if (!deleted.deletedCount) {
        res.status(422).json({
          data: {},
          message: 'user cannot be deleted.',
        });

        return
      }

      res.status(200).json({
        data: {},
        message: 'user was deleted',
      });

    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}

module.exports = routes;