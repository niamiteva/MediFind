const db = require("../models");

module.exports = {
  createList(req, res, next){
    const {listName, userId} = req.body.listName;
    return db.RemedyList.create(
      listName,
      userId,
    )
    .then((list) => {
      if (!list) {
        return res.status(400).send("Error occured during sign in.");
      }
      res.status(200).json("New list was added successfully.");
    })
    .catch((err) => {
      console.log("There was an error creating list", JSON.stringify(err));
      return res.status(500).send(err);
    });
  },

  getRemedyListsByUserId(req, res, next) {
    return db.RemedyList.findAll({
      where: {
        userId: req.body.userId,
      },
    })
      .then((lists) => {
        if (!lists) {
          console.log("No lists found");
        }
        res.status(200).send(JSON.stringify(lists));
      })
      .catch((err) => {
        console.log("There was an error querying lists", JSON.stringify(err));
        return res.status(500).send(err);
      });
  },

  editRemedyList(req, res, next) {
    return db.RemedyList.update(
      {
        listName: req.body.listName,
      },
      {
        where: {
          id: req.body.id,
        },
      })
      .then((list) => {
        if (!list) {
          console.log("No list found");
        }
        res.status(200).send(JSON.stringify(list));
      })
      .catch((err) => {
        console.log("There was an error updating list", JSON.stringify(err));
        return res.status(500).send(err);
      });
  },
};
