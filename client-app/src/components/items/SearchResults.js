import {useState, useEffect} from 'react';
import queryString from 'query-string';
import LoadingSpinner from 'react-loader-spinner'
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Card, CardActionArea, CardContent, CardMedia, Hidden } from '@material-ui/core';
import { Grid, Typography, Button, Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import {Link} from 'react-router-dom';
import {search} from '../../api/search';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    padding: '5%'
  },
  card: {
    display: 'flex',
    minWidth: '100%',
    margin: 5
  },
  cardDetails: {
    flex: 1,
    width: '80%'
  },
  cardMedia: {
    width: '80%',
    height: '70%',
    padding: 10,
    margin: 10
  },
  detailsButton: {
    marginBottom: theme.spacing(2),
    width: '90%',
    background: '#F44336',
    color: '#fff'
  },
  buyButton: {
    marginBottom: theme.spacing(2),
    width: '90%',
    background: '#B0BEC5',
    color: '#fff'
  },
  search: {
    position: 'relative',
    width: '100%',
    padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
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

export default function SearchResult(props) {
  const classes = useStyles();
  const [searchResult, setResult] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [values, setValues] = useState({
    searchText: '',
  });
  const searchText = queryString.parse(props.location.search);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    if(searchResult && searchResult.length > 0){
      setLoading(false);
      abortController.abort();
      return;
    }
    search(searchText, signal)
      .then((data) => {
        debugger;
        console.log(data);
        if(!data) {
          console.log(data);
          return;
        } else {
          setResult(data);
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false);
      })

    return () => {
      console.log("Clean the search result");
      abortController.abort();
    }
  }, [searchResult])

    return (
      <main>
        <Grid container className={classes.root}>
        <Grid item md={12} maxWidth="md">
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
          {isLoading && (<LoadingSpinner />)}
          <Grid container  direction="row" justify="center" alignItems="center">
          {!isLoading && searchResult.map(item => (      
          <Grid item md={6} spacing={3} maxWidth="md"> 
            <CardActionArea component="a" href={item.itemUrl}>
              <Card className={classes.card} spacing={3}> 
                <Grid container spacing={3}>
                  <Grid item xs>
                    <CardMedia className={classes.cardMedia} image={item.imgSrc}/>
                  </Grid>
                  <Grid item xs={6}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {item.itemName}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {item.price}
                      </Typography>
                      {/* <Typography variant="subtitle1" paragraph>
                        {post.description}
                      </Typography> */}
                      <Typography variant="subtitle1" color="primary">
                        Sopharmacy
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item xs>
                    <CardContent>
                      <Button className={classes.detailsButton}>
                        Листовка
                      </Button>
                      <Button className={classes.buyButton}>
                        Купи
                      </Button>
                    </CardContent>         
                  </Grid>
                </Grid>  
              </Card>
            </CardActionArea>
          </Grid>
          
          ))}
        </Grid>
        </Grid>
      </main> 
    );
}