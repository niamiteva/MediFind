import React, {Component, useState} from 'react';
import Loader from 'react-loader-spinner'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Typography, Button, Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '75%',
    padding: theme.spacing(5)
  },
  
}));

export default function SearchResult(props) {
  
  const location =  useLocation();
  debugger;
  const values =  props.location.state.searchResult

    return (
      <main>
        {
           JSON.stringify(values)
        }
      </main>
    );
}