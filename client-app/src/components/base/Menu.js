import React from 'react';
import { createStyles, makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import auth from '../../api/auth';
import {Link, withRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
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
        <Typography variant="h6" color="inherit" className={classes.title} style={isActive(history, "/")}>
          MediFind
        </Typography>
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
            <Link to={"/user/" + auth.isAuthenticated().user.userId}>
              <Button className={classes.menuButton} style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                My Profile
              </Button>
            </Link>
            <Button className={classes.menuButton} color="inherit" onClick={() => {
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