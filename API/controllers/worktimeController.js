const db = require("../models");

module.exports = {
  createWorkTime(req, res, next) {
    const {doctorId, day, to, from} = req.body;
    return await db.Worktime.create(doctorId, day, to, from)
      .then((worktime)=> {
        if(!worktime) {
          console.log("cannot create worktime");
          return res.status(400).send("Could not create worktime");
        }

        res.status(200).send(worktime);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Something went wrong during creation of worktime.")
      })
  },

  retrieveWorktimeByDoctorId(req, res, next) {

  },

  updateWorkTime(req, res, next) {
    
  }
}