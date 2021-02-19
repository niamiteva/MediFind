import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import {Link} from 'react-router-dom';
import CategoriesMenu from './categories/CategoriesMenu';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    width: '80%',
    padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(18),
      marginBottom: theme.spacing(3),
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

export default function SearchBar(){
  const classes = useStyles();
  const [category, setCategory] = useState("remedy");
  const [values, setValues] = useState({
    searchText: '',
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Paper component="form" className={classes.search}>
      <CategoriesMenu setCategory={setCategory} category={category}/>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        placeholder="Търсене..."
        inputProps={{ 'aria-label': 'търсене...' }}
        id="search" type="search"
        value={values.searchText} onChange={handleChange('searchText')} 
      />
      <Link to={"/search/"+ category +"?q=" + values.searchText }>
        <IconButton className={classes.iconButton} aria-label="searchText">
          <SearchIcon />
        </IconButton>     
      </Link>
    </Paper>
  )

}