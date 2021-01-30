import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button, TextField, Typography} from '@material-ui/core';
import {Card, CardActions, CardContent} from '@material-ui/core';
import { Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
//import DeleteUser from './DeleteUser'
import auth from "../../../../api/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%', 
    padding: theme.spacing(3), 
    marginTop: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '85%'
  },
}));

export default function PatientPersonalDetails(props) {
  const classes = useStyles();
  const { user } = props;

  const handleChange = (name) => (event) => {
    return;
  }

  return (
    <Card className={classes.root}>
        <CardContent>  
          <Grid container>
        <Grid item md={3}>
          <Avatar>
            <Person />
          </Avatar>
          <Button>Change picture</Button>
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
              readOnly: auth.isAuthenticated().user && auth.isAuthenticated().user.userId === user.userId,
            }}
          />
          <br />
          <TextField
            id="lastName"
            label="Фамилия"
            className={classes.textField}
            value={user.lastName}
            onChange={handleChange("lastName")}
            margin="normal"
            InputProps={{
              readOnly: auth.isAuthenticated().user && auth.isAuthenticated().user.userId === user.userId,
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
              readOnly: auth.isAuthenticated().user && auth.isAuthenticated().user.userId === user.userId,
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
              readOnly: auth.isAuthenticated().user && auth.isAuthenticated().user.userId === user.userId,
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
              readOnly: auth.isAuthenticated().user && auth.isAuthenticated().user.userId === user.userId,
            }}
          />
          <br/>
          <Button>Change picture</Button>
          <Button>Change picture</Button>
        </Grid>
        </Grid>
    </CardContent>
    </Card>
  );
}
