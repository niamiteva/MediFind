import React from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import auth from '../../api/auth';
import {Link, withRouter} from 'react-router-dom';
import logo from '../../content/img/MediFindLogo.png'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    space: {
      flexGrow: 1,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 40
    },
    logoIcon:{
      width: 100,
      margin: theme.spacing(1),
      marginRight: theme.spacing(2),
    }
  }),
); 
const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#ffffff'}
  else
    return {color: '#ffffff'}
}

export default withRouter((history) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>       
        <Typography color="inherit" className={classes.title} style={isActive(history, "/")}>
          MediFind
        </Typography>
        <img className={classes.logoIcon} src={logo}/>
        <div className={classes.space}/>
        {
          !auth.isAuthenticated() && (<span>
            <Link to="/signup">
              <Button className={classes.menuButton} color="secondary" variant="contained">Sign up
              </Button>
            </Link>
            <Link to="/login">
              <Button className={classes.menuButton} color="secondary" variant="contained">Log In
              </Button>
            </Link>
          </span>)
        }
        {
          auth.isAuthenticated() && (<span>
            <Link to={"/user/" + auth.isAuthenticated().user.id}>
              <Button className={classes.menuButton} color="secondary" variant="contained" style={isActive(history, "/user/" + auth.isAuthenticated().user.id)}>
                My Profile
              </Button>
            </Link>
            <Button className={classes.menuButton} color="secondary" variant="contained" onClick={() => {
                auth.clearJWT(() => history.push('/'))
              }}>
              Sign out
            </Button>
          </span>)
        }
      </Toolbar>
    </AppBar>
  )
})