const db = require('../models');

module.exports = {
  users(req, res){
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

  userById(req, res) { //next
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

  create(req, res) {
    const {firstName, lastName, personalNumber, email, password} = req.body;
    return db.User.create({firstName, lastName, personalNumber, email, password})
      .then((user) => {
        if(!user) {
          return res.status(400).send({
            error: "Error occured during sign in."
          })
        }

        res.status(200).send({
          message: "Successfully signed up!"
        });
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  }
}