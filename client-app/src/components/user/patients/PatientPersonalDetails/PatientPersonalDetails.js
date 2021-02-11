import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import AccountBox from "@material-ui/icons/AccountBox";
import Divider from "@material-ui/core/Divider";
//import DeleteUser from './DeleteUser'
import auth from "../../../../api/auth";
import {updateUser} from "../../../../api/users";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "85%",
  },
}));

export default function PatientPersonalDetails(props) {
  const classes = useStyles();
  const { user } = props;
  const canEdit = auth.isAuthenticated().user && auth.isAuthenticated().user.id === user.id;
  const [isEdited, setIsEdited] = useState(false);
  const [values, setValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    personalNumber: user.personalNumber,
    password: user.password,
    email: user.email,
    error: "",
  });

  const clickSubmit = () => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName ,
      personalNumber: values.personalNumber ,
      email: values.email ,
      password: values.password ,
    };

    updateUser({ userId: match.params.userId }, { t: jwt.token }, user).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
          setRedirectToSignin(true);
        } else {
          setValues({...values, error: ""});
        }
      }
    );
  };

  const clickDiscard = () => {
    values.firstName = user.firstName;
    values.lastName = user.lastName;
    values.personalNumber = user.personalNumber;
    values.password = user.password;
    values.email = user.email;
    setValues({
      ...values
    });
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setIsEdited(true);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item container md={12} >
            <Grid item md={3} >
              <AccountBox style={{ fontSize: 200, color: 'grey' }}/>
              <Button  
                variant="outlined"
                size="medium"
                color="secondary"
                style={{marginLeft: 19}}>
                  Change picture
              </Button>
            </Grid>
            <Grid item md={8}>
              <TextField
                id="firstName"
                label="Име"
                className={classes.textField}
                value={user.firstName}
                onChange={handleChange("firstName")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit
                }}
              />
              <br />
              <TextField
                id="lastName"
                label="Фамилия"
                className={classes.textField}
                value={values.lastName || user.lastName}
                onChange={handleChange("lastName")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit,
                }}
              />
              <br />
              <TextField
                id="personalNumber"
                label="ЕГН/ЛЧН/ЛН/СЛН"
                className={classes.textField}
                value={user.personalNumber}
                onChange={handleChange("personalNumber")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit
                }}
              />
              <br />
              <TextField
                id="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={user.email}
                onChange={handleChange("email")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit
                }}
              />
              <br />
              <TextField
                id="password"
                type="password"
                label="Password"
                className={classes.textField}
                value={user.password}
                onChange={handleChange("password")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit
                }}
              />
              <br />
            </Grid>
          </Grid>
          <Grid item container md={12}>
            <Grid item xs={8} />
            <Grid item xs={4}>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                disabled={!isEdited}
                onClick={clickSubmit}
                style={{marginRight: 10}}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                onClick={clickDiscard}
                disabled={!isEdited}
              >
                Discard
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
