import React, { useState } from "react";
import {Grid, Card, CardActions, CardContent } from "@material-ui/core";
import { Button, TextField, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { makeStyles, Theme } from "@material-ui/core/styles";
import auth from "../../api/auth";
import { Redirect } from "react-router-dom";
import { login } from "../../api/users";
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
    maxWidth: "80%",
    margin: "auto",
    textAlign: "center",
    paddingBottom: theme.spacing(2),
    margin: '8%',
    marginBottom: '40%'
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "80%",
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

export default function LogIn(props) {
  const classes = useStyles();
  const img = homeImg;
  const [values, setValues] = useState({
    email: "",
    password: "",
    userId: "",
    error: "",
    redirectToReferrer: false,
  });

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    login(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({
            ...values,
            userId: data.user.userId,
            error: "",
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { redirectToReferrer, userId } = values;
  if (redirectToReferrer) {
    return <Redirect to={"/user/" + userId} />;
  }

  return (
    <main>
      <div
        className={classes.backContent}
        style={{ backgroundImage: `url(${img})` }}
      >
        {<img style={{ display: "none" }} src={img} />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item xs></Grid>
          <Grid item md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.title}>
                  Sign In
                </Typography>
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
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </div>
    </main>
  );
}
