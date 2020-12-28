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
    return db.User.findById(req.params.id)
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
  }
}