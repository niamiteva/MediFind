import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import homeImg from '../../../../content/img/homepage.jpg';
import { Grid} from '@material-ui/core';
import SearchBar from '../../../searchBar/SearchBar'
import SiteInfoCard  from './HomePageCards/SiteInfoCard';
import SignUpInvitation from './HomePageCards/SignUpInvitation';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '75%',
    padding: theme.spacing(5)
  },
  backContent: {
    height: '100%', 
    position: 'relative',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: homeImg,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  left: {
    position: 'relative',
    padding: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(10),
      paddingLeft: theme.spacing(18),
      paddingRight: 0,
    },
  },
  right: {
    position: 'relative',
    padding: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(8),
    },
  }
}));

export default function GuestUserContent(){
  const classes = useStyles();
  const img = homeImg;

  return (
    <div className={classes.backContent} style={{ backgroundImage: `url(${img})` }}>
      {<img style={{ display: 'none' }} src={img}/>}
      <div className={classes.overlay} />
      <Grid container >
        <Grid item md={12} container direction="row" justify="center" alignItems="center">
          <Grid item md={6}>
            <div className={classes.left}>
              <SiteInfoCard/>
            </div>
          </Grid>
          <Grid item md={6}>
            <div className={classes.right}>
              <SignUpInvitation/>
            </div>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <SearchBar/>
        </Grid>
      </Grid>         
    </div>
  )
}