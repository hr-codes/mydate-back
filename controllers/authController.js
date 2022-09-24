const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const authController = {
  signIn: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username: username })

      if (!user) {
        res.status(422).json({
          data: {},
          message: 'user not found',
        });

        return
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const id = user._id;

          const token = jwt.sign({ id }, process.env.MYDATE_SECRET, {
            expiresIn: 3000 // expires in 50min
          });

          return res.status(200).json({ auth: true, token: token });
        } else {
          res.status(422).json({
            data: {},
            message: 'user is not valid',
          });
        }
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  logout: (req, res) => res.status(200).json({ auth: false, token: null })
}

module.exports = authController;
