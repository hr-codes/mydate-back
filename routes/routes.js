const express = require('express');
const router = express.Router();

const users = require('./users');
const auth = require('./auth');

const middlewareAuth = require('../middlewares/Authentication')

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());

  next();
});

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome!'
  })
});

router.route('/users')
  .get(middlewareAuth, users.getAll)
  .post(middlewareAuth, users.post)

router.route('/users/:id')
  .patch(middlewareAuth, users.patch)
  .get(middlewareAuth, users.get)
  .delete(middlewareAuth, users.delete)

router.route('/auth/sign-in')
  .post(auth.signIn)

router.route('/auth/sign-up')
  .post(users.post)

router.route('/auth/logout')
  .post(auth.logout)

module.exports =  router;