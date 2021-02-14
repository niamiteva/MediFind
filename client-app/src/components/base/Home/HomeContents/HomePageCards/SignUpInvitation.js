import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Divider,Paper } from '@material-ui/core';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '75%',
    padding: theme.spacing(5)
  },
  signup: {
    marginBottom: theme.spacing(2),
    width: '100%',
    background: '#F44336',
    color: '#fff'
  },
  signuptext: {
    textAlign: 'center', 
    marginBottom: theme.spacing(2)
  },
  login: {
      marginTop: theme.spacing(2),
      width: '100%',
      background: '#B0BEC5',
      color: '#fff'
  },
}));

export default function SignUpInvitation(){
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item md={12}>
          <Link to="/signup">
            <Button className={classes.signup} variant="contained">Sign up</Button>
          </Link>  
        </Grid>
      </Grid>                            
      <Typography variant="body2" color="textSecondary" component="p" className={classes.signuptext}>
        Нямате регистрация? Без регистрация имате достъп само до търсачката. Регистрирайте се като изберете вид потребител и попълнете необходимите данни в съответната форма за регистрация. 
      </Typography> 
      <Divider/>
      <Grid container>
        <Grid item md={12}>
          <Link to="/login">
            <Button className={classes.login} variant="contained">Log In</Button>
          </Link>
        </Grid>
      </Grid>          
    </Paper>
  )
}