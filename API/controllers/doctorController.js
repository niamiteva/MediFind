const db = require("../models");
const { Op } = require("sequelize");

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

  searchDoctors(req, res, next) {
    const text = req.body.q;
    return db.Doctor.findAll({
      where: {
        [Op.or]: [
          {firstName: {[Op.startsWith]: text}},
          {firstName: {[Op.like]: text}},
          {lastName: {[Op.startsWith]: text}},
          {lastName: {[Op.like]: text}}
        ]
      }
    })
      .then((doctors) => {
        if (!doctors) {
          return res.status(400).send({
            error: "User not found",
          });
        }

        console.log(doctors);
        res.status(200).send(doctors);
      })
      .catch((err) => {
        return res.status("500").send({
          error: "Could not retrieve doctors",
        });
      });
  },

  getDoctorsPatients(req, res, next) {
    const doctorId = req.params.id;
    return db.Doctor.findByPk(doctorId, {
      include: [
        {
          model: db.User,
          as: "users",
          attributes: ["id", "firstName", "lastName", "personalNumber", "email"],
          through:{
            attributes: [],
          }
        }
      ]
    })
    .then((users) => {
      if(!users) {
        console.log("Doctor does not have users (patients)");
      }

      res.status(200).send(users);
    })
    .catch((err) => {
      console.log(err);
      console.log("Error during retrieving users by doctor id");
      res.status(500).send("Error during retrieving users by doctor id");
    })
  },

  relateToUser(req, res, next) {
    const doctorId = req.params.id;
    const userId = req.body.userId;
    return db.Doctor.findOne({
      where: {
        id: doctorId
      }
    })
    .then((doctor) => {
      if(!doctor) {
        console.log("Doctor not found");
        return res.status(400).send("Doctor not found");
      }

      return db.User.findOne({
        where: {
          id: userId
        }
      })
      .then((user) => {
        if(!user) {
          console.log("User not found");
          return res.status(400).send("User not found");
        }

        doctor.addUser(user);;
        console.log("Doctor was relted to user");
        return res.status(200).send(doctor);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send("Error during creatting relation doctor-user");
      })
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error during searching for doctor");
    })
  }
};
