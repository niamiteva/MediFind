import React, {useState} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Home from './Home';
import SearchResult from '../items/SearchResults';

const Content = () => {
  const location = window.location.pathname || '/';

  return (    
    <div>
      {
        (location === '/') && <Home/>
      }
      {
        (location === '/search') && <SearchResult/>
      }
    </div>
)}

export default (Content)