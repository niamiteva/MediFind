import {useState, useEffect} from 'react';
import queryString from 'query-string';
import Loader from 'react-loader-spinner'
import { makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Typography, Button, Divider, IconButton, InputBase, Paper } from '@material-ui/core';
import {search} from '../../api/search';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '75%',
    padding: theme.spacing(5)
  },
  
}));

export default function SearchResult(props) {
  const classes = useStyles();
  const [searchResult, setResult] = useState({});
  const [isLoading, setLoading] = useState(false)
  const searchText = queryString.parse(props.location.search);

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
        <b>serach for {searchText.q}</b>
        {
           JSON.stringify(searchResult)
        }
      </main> 
    );
}