const db = require("../models");

module.exports = {
  update(req, res) {
    const {
      firstName,
      lastName,
      personalNumber,
      password,
      email,
      specialtyId,
      specialtyName,
    } = req.body;
    const doctorId = req.params.id;
    return db.Doctor.findOne({
      where: {
        id: doctorId,
      },
    })
      .then((doctor) => {
        if (!doctor) {
          return res.status(400).send({
            error: "Doctor not found",
          });
        }

        doctor.firstName = firstName || doctor.firstName;
        doctor.lastName = lastName || doctor.lastName;
        doctor.email = email || doctor.email;
        doctor.personalNumber = personalNumber || doctor.personalNumber;
        doctor.specialtyId = specialtyId || doctor.specialtyId;
        doctor.specialtyName = specialtyName || doctor.specialtyName;
        if (password) {
          doctor.password = password;
        }

        return doctor
          .save()
          .then((doctor) => {
            if (!doctor) {
              return res
                .status(400)
                .send("Error occured during saving doctor.");
            }

            console.log("Doctor was successfully edited.");
            return res.status(200).send(doctor);
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json(error);
          });
      })
      .catch((err) => {
        return res.status("500").send({
          error: "Could not execute find doctor",
        });
      });
  },

  doctors(req, res, next) {
    return db.Doctor.findAll()
      .then((doctors) => {
        res.status(200).send(JSON.stringify(doctors));
        console.log(JSON.stringify(doctors));
      })
      .catch((err) => {
        console.log("There was an error querying doctors", JSON.stringify(err));
        return res.status(500).send(err);
      });
  },

  doctorById(req, res, next) {
    const doctorId = req.params.id;
    return db.Doctor.findOne({
      where: {
        id: doctorId,
      },
    })
      .then((doctor) => {
        if (!doctor) {
          return res.status(400).send({
            error: "User not found",
          });
        }

        console.log("get user");
        doctor.type = "Doctor";
        console.log(doctor);
        res.status(200).send(doctor);
      })
      .catch((err) => {
        return res.status("500").send({
          error: "Could not retrieve user",
        });
      });
  },

  //relatedToContacts
};
