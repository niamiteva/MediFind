const db = require("../models");
const crypto = require("crypto"); //"crypto-random-string");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { sendVerificationEmail } = require("../helpers/nodeMailer");
const {doctorById} = require("./doctorController");

module.exports = {
  users(req, res, next) {
    return db.User.findAll()
      .then((users) => {
        res.status(200).send(JSON.stringify(users));
        console.log(JSON.stringify(users));
      })
      .catch((err) => {
        console.log(
          "There was an error querying contacts",
          JSON.stringify(err)
        );
        return res.status(500).send(err);
      });
  },

  userById(req, res, next) {
    const userId = req.params.id;
    return db.User.findOne({
      where: {
        id: userId,
      },
    })
      .then((user) => {
        if (!user) {
          return doctorById(req, res, next);
        }

        console.log("get user");
        user.type = "Pacient";
        console.log(user);
        res.status(200).send(user);
      })
      .catch((err) => {
        return res.status("500").send({
          error: "Could not retrieve user",
        });
      });
  },

  create(req, res, next) {
    console.log("create");
    const { firstName, lastName, personalNumber, email, password } = req.body;
    const isVerified = true; //temorary becouse of issues with the email verification
    return db.User.create({
      firstName,
      lastName,
      personalNumber,
      email,
      password,
      isVerified,
    })
      .then((user) => {
        if (!user) {
          return res.status(400).send("Error occured during sign in.");
        }
        const secretToken = crypto.randomBytes(16).toString("base64");
        return db.VerificationToken.create({
          userId: user.id,
          token: jwt.sign({ id: user.id }, secretToken, { expiresIn: "1d" }),
        })
          .then((result) => {
            console.log(user.firstName);
            if (!result) {
              return res
                .status(400)
                .send("Error occured during token creation in.");
            }
            //commented because of gmail security issues
            //sendVerificationEmail(user.firstName, user.email, result.token);
            return res
              .status(200)
              .json(
                "Account created successfully. Please verify your email to activate your account."
              );
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json(error);
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json(error);
      });
  },

  update(req, res) {
    const { firstName, lastName, personalNumber, password, email } = req.body;
    const userId = req.params.id;
    return db.User.findOne({
      where: {
        id: userId,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            error: "User not found",
          });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.personalNumber = personalNumber || user.personalNumber;
        if (password) {
          user.password = password;
        }

        return user
          .save()
          .then((user) => {
            if (!user) {
              return res.status(400).send("Error occured during saving user.");
            }

            console.log("User was successfully edited.");
            return res.status(200).send(user);
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json(error);
          });
      })
      .catch((err) => {
        return res.status("500").send({
          error: "Could not execute find user",
        });
      });
  },

  getPatientsDoctors(req, res, next) {
    const userId = req.params.id;
    return db.User.findByPk(userId, {
      include: [
        {
          model: db.Doctor,
          as: "doctors",
          attributes: ["id", "firstName", "lastName", "specialtyName", "email"],
          through:{
            attributes: [],
          }
        }
      ]
    })
    .then((doctors) => {
      if(!doctors) {
        console.log("User does not have doctors");
      }

      res.status(200).send(doctors);
    })
    .catch((err) => {
      console.log(err);
      console.log("Error during retrieving doctors by user id");
      res.status(500).send("Error during retrieving doctors by user id");
    })
  },

  relateToDoctor(req, res, next) {
    const doctorId = req.body.doctorId;
    const userId = req.params.id;
    return db.User.findOne({
      where: {
        id: userId
      }
    })
    .then((user) => {
      if(!user) {
        console.log("USer not found");
        return res.status(400).send("User not found");
      }

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

        user.addDoctor(doctor);;
        console.log("User was relted to doctor");
        return res.status(200).send(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send("Error during creatting relation user-doctor");
      })
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send("Error during searching for user");
    })
  }
};
