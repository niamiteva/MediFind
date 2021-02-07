const db = require("../models");

module.exports = {
  verify(req, res, next) {
    return db.User.findOne({
      where: { email: req.body.email },
    })
      .then((user) => {
        if (user.isVerified) {
          return res.status(202).json("Email Already Verified");
        } else {
          return db.VerificationToken.findOne({
            where: { token: req.body.verificationToken },
          })
            .then((foundToken) => {
              if (foundToken) {
                return user
                  .update({ isVerified: true })
                  .then((updatedUser) => {
                    console.log(updatedUser);
                    return res
                      .status(403)
                      .json(`User with ${user.email} has been verified`);
                  })
                  .catch((reason) => {
                    console.error(reason);
                    return res.status(403).json("Verification failed");
                  });
              } else {
                return res.status(404).json("Token expired");
              }
            })
            .catch((reason) => {
              console.error(reason);
              return res.status(404).json("Token expired");
            });
        }
      })
      .catch((reason) => {
        console.error(reason);
        return res.status(404).json("Email not found");
      });
  },
};
