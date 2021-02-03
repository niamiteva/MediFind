const db = require('../models');
const crypto = require('crypto-random-string');
const { sendVerificationEmail } = require('../helpers/nodeMailer');

module.exports = {
  users(req, res, next){
    return db.User.findAll()
      .then((users) => {
        res.status(200).send(JSON.stringify(users));
        console.log(JSON.stringify(users));
      })
      .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
        return res.status(400).send(err)
      });
  },

  userById(req, res, next) { //next
    return db.User.findOne(
      {where: {
        userId: req.params.id
      }})
      .then((user) => {
        if(!user) {
          return res.status(400).send({
            error: "User not found"
          });
        }
        //req.profile = user
        res.status(200).send(user);
      })
      .catch((err) => {
        return res.status('400').send({
          error: "Could not retrieve user"
        });
      });
  },

  create(req, res, next) {
    return models.User.findOrCreate({
      where: { email:  req.body.email },
      defaults: req.body
    })
    .spread((user, created) => {
      if(!user) {
        return res.status(400).send('Error occured during sign in.');
      }
      if(!created) {
        return res.status(409).json('User with email address already exists');
      } else {
        const secretToken = crypto(16);
        return models.VerificationToken.create({
          userId: user.userId,
          token: jwt.sign(mail, secretToken, { expiresIn: '1d' })
        }).then((result) => {
          sendVerificationEmail(user.firstName,user.email, result.token);
          return res.status(200).json('Account created successfully. Please verify your email to activate your account.');
        })
        .catch((error) => {
          return res.status(500).json(error);
        });
      }
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
  }
}