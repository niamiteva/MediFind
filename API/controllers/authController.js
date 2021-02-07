const db = require("../models");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require("../../configs/config");
const crypto = require('crypto'); //"crypto-random-string");
const jwtSecret = crypto.randomBytes(16).toString("base64");

module.exports = {
  logIn(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    return db.User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            error: "User not found",
          });
        }

        if (!user.authenticate(password)) {
          return res.status(401).send({
            error: "Email and password don't match.",
          });
        }

        console.log(user);

        if (!user.isVerified) {
          return res.status(401).send({
            message: "Account is not activated. Please Verify Your Email!",
          });
        }

        const token = jwt.sign(
          {
            id: user.id,
          },
          jwtSecret
        );

        res.cookie("jwt", token, {
          expire: new Date() + 9999,
        });

        return res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status("401").send({
          error: "Could not sign in",
        });
      });
  },

  logOut() {},

  requireSignin() {
    return expressJwt({
      secret: jwtSecret,
      userProperty: "auth",
    });
  },

  hasAuthorization(req, res, next) {
    const authorized =
      req.profile && req.auth && req.profile.id == req.auth.id;
    if (!authorized) {
      return res.status("403").json({
        error: "User is not authorized",
      });
    }
    next();
  },
};
