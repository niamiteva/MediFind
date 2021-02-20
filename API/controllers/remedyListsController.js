const db = require("../models");

module.exports = {
  createList(req, res, next){
    const {listName, userId} = req.body;
    return db.RemedyList.create({
      listName,
      userId,
    })
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
    console.log(req.params);
    return db.RemedyList.findAll({
      where: {
        userId: req.params.id,
      },
    })
      .then((lists) => {
        if (!lists) {
          console.log("No lists found");
        }
        console.log(lists);
        res.status(200).send(JSON.stringify(lists));
      })
      .catch((err) => {
        console.log("There was an error querying lists", JSON.stringify(err));
        return res.status(500).send(err);
      });
  },

  editRemedyList(req, res, next) {
    //const {listName, userId} = req.body;
    const listId = req.params.id;
    return db.RemedyList.update(req.body, {
        where: {
          id: listId,
        },
      })
      .then((list) => {
        if (!list) {
          console.log("No list found");
          return res.status(400).send("List not found");
        }

        console.log("Successfully edit a remedy list")
        res.status(200).send(JSON.stringify(list));
      })
      .catch((err) => {
        console.log("There was an error updating list", JSON.stringify(err));
        return res.status(500).send(err);
      });
  },

  deleteRemedyList(req, res, next) {
    const listId = req.params.id;
    return db.RemedyList.destroy({
      where:{
        id: listId,
      }
    })
    .then((deletedList)=> {
      if(!deletedList) {
        console.log("List not found");
        return res.status(400).send("List not found");
      }

      console.log("List deleted");
      res.json(deletedList);
    })
    .catch((err) => {
      console.log("There was an error deleting list");
      console.log(err);
      return res.status(500).json(err);
    })
  }
};
