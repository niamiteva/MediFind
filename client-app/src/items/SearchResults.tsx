import React, {Component, useState} from 'react';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles';
import {search} from '../api/search';
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
  
}));

export default function SearchResult() {
  
  const location =  useLocation();
  const state =  location.state;
  const searchText = queryString.parse(location.search);
  const [values, setValues] = useState({
      itemUrl: '',
      itemName: '',
      imgSrc: '',
      price: '',
      error: '',
    });

    search(searchText)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error});
        } else {
          setValues({ ...values, error: ''})
        }
    });

    return (
      <main>
        {JSON.stringify(values)}
      </main>
    );
}