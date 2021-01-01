import React, {useState} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import homeImg from '../content/img/homepage.jpg';
import { Grid, Typography, Button, Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
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
  title: {
    marginTop: theme.spacing(2),
  },
  right: {
    position: 'relative',
    padding: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(8),
    },
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
  search: {
    position: 'relative',
    width: '80%',
    padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(18),
      marginBottom: theme.spacing(18),
      marginTop: theme.spacing(3)
  },
  input: {   
    marginLeft: theme.spacing(1),  
    flex: 1, 
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Home(){
  const classes = useStyles();
  const img = homeImg;

  const [values, setValues] = useState({
    searchText: '',
    error: '',
  });

  const clickSubmit = () => {
    const searchText = values.searchText || '';
    console.log(searchText);
    return (<Redirect to={{ pathname: "/search/remedy/", search: "?q=" + searchText }}/>)
  };

  const handleChange = (name: string) => (event: any) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <main>
      <div className={classes.backContent} style={{ backgroundImage: `url(${img})` }}>
      {<img style={{ display: 'none' }} src={img}/>}
      <div className={classes.overlay} />
        <Grid container >
          <Grid item md={12} container direction="row" justify="center" alignItems="center">
            <Grid item md={6}>
              <div className={classes.left}>
              <Paper elevation={3} className={classes.root}>
                <Typography gutterBottom variant="h5" component="h2">
                  Какво представлява MediFind?
                </Typography>
                <Divider/>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.title}>
                  MediFind е платформа за търсене на лекарства и проверка за наличието им по аптеките. Търсачка за специалисти и връзка с тях. Предоставя и издаване на електронни рецепти и направления. Въсможност да събирате всичко с вързано с ваши лечения на едно място и лекуващите ви лекари да проследят лечениято и да проверят за предишни такива.
                </Typography>
              </Paper>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className={classes.right}>
              <Paper className={classes.root}>
                <Grid container>
                  <Grid item md={12}>
                    <Link to="/signup">
                      <Button className={classes.signup} variant="contained">Sign up
                      </Button>
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
                      <Button className={classes.login} variant="contained">Log In
                      </Button>
                    </Link>
                  </Grid>
                </Grid>          
              </Paper>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12}>
            <Paper component="form" className={classes.search}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <InputBase
                className={classes.input}
                placeholder="Търсене..."
                inputProps={{ 'aria-label': 'търсене...' }}
                id="search" type="search"
                value={values.searchText} onChange={handleChange('searchText')} 
              />
              <Link to={"/search/remedy?q=" + values.searchText }>
                <IconButton className={classes.iconButton} aria-label="searchText">
                  <SearchIcon />
                </IconButton> 
              </Link>            
            </Paper>
          </Grid>
        </Grid>         
      </div>
    </main>
  )
}