const db = require("../models");

module.exports = {
  specialties(req, res, next) {
    return db.Specialty.findAll()
      .then((result) => {
        res.status(200).send(JSON.stringify(result));
        console.log(JSON.stringify(result));
      })
      .catch((err) => {
        console.log(
          "There was an error querying specialties",
          JSON.stringify(err)
        );
        return res.status(500).send(err);
      });
  },
}