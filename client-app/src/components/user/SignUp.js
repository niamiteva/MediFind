import React, { useState } from "react";
import { Card, CardActions, CardContent, Grid } from "@material-ui/core";
import { Button, TextField, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { createUser } from "../../api/users";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import homeImg from "../../content/img/homepage.jpg";

const useStyles = makeStyles((theme) => ({
  backContent: {
    height: "100%",
    position: "relative",
    color: theme.palette.common.white,
    backgroundImage: homeImg,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  card: {
    position: "relative",
    maxWidth: '80%',
    textAlign: "center",
    margin: '8%',
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '80%',
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const img = homeImg;

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    personalNumber: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      personalNumber: values.personalNumber || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    createUser(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  return (
    <main>
      <div
        className={classes.backContent}
        style={{ backgroundImage: `url(${img})` }}
      >
        {<img style={{ display: "none" }} src={img} alt="background image"/>}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item xs />
          <Grid item md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.title}>
                  Sign Up
                </Typography>
                <TextField
                  id="firstName"
                  label="Име"
                  className={classes.textField}
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  margin="normal"
                />
                <br />
                <TextField
                  id="lastName"
                  label="Фамилия"
                  className={classes.textField}
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  margin="normal"
                />
                <br />
                <TextField
                  id="personalNumber"
                  label="ЕГН/ЛЧН/ЛН/СЛН"
                  className={classes.textField}
                  value={values.personalNumber}
                  onChange={handleChange("personalNumber")}
                  margin="normal"
                />
                <br />
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  className={classes.textField}
                  value={values.email}
                  onChange={handleChange("email")}
                  margin="normal"
                />
                <br />
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  className={classes.textField}
                  value={values.password}
                  onChange={handleChange("password")}
                  margin="normal"
                />
                <br />
                {values.error && (
                  <Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>
                      error
                    </Icon>
                    {values.error}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={clickSubmit}
                  className={classes.submit}
                >
                  Submit
                </Button>
              </CardActions>
            </Card>
            <Dialog open={values.open} disableBackdropClick={true}>
              <DialogTitle>New Account</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  New account successfully created.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Link to="/login">
                  <Button
                    color="secondary"
                    autoFocus={true}
                    variant="contained"
                  >
                    Sign In
                  </Button>
                </Link>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    </main>
  );
}
