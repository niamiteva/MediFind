const db = require('../models');

module.exports = {

  logIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;
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
  
      const token = jwt.sign({
        _id: user._id
      }, config.jwtSecret)
  
      res.cookie("t", token, {
        expire: new Date() + 9999
      })
  
      return res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      })
    })
    .catch((err) => {
      return res.status('401').json({
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