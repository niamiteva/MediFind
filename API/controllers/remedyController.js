const db = require("../models");

module.exports = {

  createRemedy(req, res, next){
    const {remedyName, listId} = req.body;
    const checked = false;
    return db.Remedy.create({
      remedyName,
      listId,
      checked
    })
    .then((remedy) => {
      if (!remedy) {
        return res.status(400).send("Unsuccessful creation");
      }
      res.status(200).json("New remedy was added successfully.");
    })
    .catch((err) => {
      console.log("There was an error creating list", JSON.stringify(err));
      return res.status(500).send(err);
    });
  },

  getRemediesByListId(req, res, next) {
    console.log(req.params);
    return db.Remedy.findAll({
      where: {
        listId: req.params.id,
      },
    })
      .then((lists) => {
        if (!lists) {
          console.log("No remedies for the given list found");
        }
        console.log(lists);
        res.status(200).send(JSON.stringify(lists));
      })
      .catch((err) => {
        console.log("There was an error querying remedies", JSON.stringify(err));
        return res.status(500).send(err);
      });
  },

  editRemedy(req, res, next) {
    const {checked} = req.body;
    const remedyId = req.params.id;
    return db.Remedy.update(checked, {
        where: {
          id: remedyId,
        },
      })
      .then((remedy) => {
        if (!remedy) {
          console.log("No remedy found");
        }

        console.log("Successfully edit a remedy")
        res.status(200).send(JSON.stringify(remedy));
      })
      .catch((err) => {
        console.log("There was an error updating remedy", JSON.stringify(err));
        return res.status(500).send(err);
      });
  },
}