const db = require('../models');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../../configs/config');

module.exports = {

  logIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    return db.User.findOne({
      where: {
        email: email,
      }
    })
    .then((user) => {
      if(!user) {
        return res.status(401).send({
          error: "User not found"
        });
      }

      if (!user.authenticate(password)) {
        return res.status(401).send({
          error: "Email and password don't match."
        })
      }
  
      console.log(user);

      const token = jwt.sign({
        userId: user.userId
      }, config.jwtSecret)
  
      res.cookie("t", token, {
        expire: new Date() + 9999
      })
  
      return res.json({
        token,
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email
        }
      })
    })
    .catch((err) => {
      console.error(err);
      return res.status('401').send({
        error: "Could not sign in"
      });
    })

  },

  logOut() {},

  requireSignin() {
    return expressJwt({
      secret: config.jwtSecret,
      userProperty: 'auth'
    })
  },
  
  hasAuthorization(req, res, next) {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
  }
}