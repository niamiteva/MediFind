import { useState, useEffect } from "react";
import queryString from "query-string";
import {Grid, CircularProgress } from "@material-ui/core";
import { search } from "../../api/search";
import RemedyItemCard from "./remedyItemCard/RemedyItemCard";
import SearchBar from '../searchBar/SearchBar';

export default function SearchResult(props) {
  const [searchResult, setResult] = useState({});
  const [isLoading, setLoading] = useState(true);
  const searchText = queryString.parse(props.location.search);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    if (searchResult && searchResult.length > 0) {
      setLoading(false);
      abortController.abort();
      return;
    }
    search(searchText, signal)
      .then((data) => {
        debugger;
        console.log(data);
        if (!data) {
          console.log(data);
          return;
        } else {
          setResult(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });

    return () => {
      console.log("Clean the search result");
      abortController.abort();
    };
  }, [searchResult, searchText]);

  return (
    <main>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item md={8} container>
          <Grid item md={12} maxWidth="md">
            <SearchBar />
          </Grid>
          {isLoading && <CircularProgress  />}
          <Grid container direction="row" justify="center" alignItems="center">
            {!isLoading && searchResult.map((item) => (
               <RemedyItemCard remedy={item.itemName} imgUrl={item.imgSrc} price={item.price} itemUrl={item.itemUrl}/>
            ))}
          </Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </main>
  );
}
