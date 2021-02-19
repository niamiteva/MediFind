import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import queryString from "query-string";
import { Grid, CircularProgress, Paper, List, Box } from "@material-ui/core";
import { searchDoctors } from "../../../api/search";
import { getAllDoctors } from "../../../api/doctors";
import SearchBar from "../searchBar/SearchBar";
import DoctorListItem from "./doctorListItem/DoctorListItem";
import { ClassRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "80%",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(18),
    marginBottom: theme.spacing(18),
  },
  searchBg: {
    backgroundColor: 'rgb(0 0 0 / 12%)'
  }
}));

export default function DoctorResult(props) {
  const [searchResult, setResult] = useState({});
  const [isLoading, setLoading] = useState(true);
  const searchText = queryString.parse(props.location.search);
  const classes = useStyles();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);
    if (searchResult && searchResult.length > 0) {
      setLoading(false);
      abortController.abort();
      return;
    }
    getAllDoctors(signal)
      .then((data) => {
        debugger;
        console.log(data);
        if (!data) {
          console.log(data);
          return;
        } else {
          data.filter(
            (x) =>
              x.firstName.startsWith(searchText.q) ||
              x.lastName.startsWith(searchText.q)
          );
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
  }, [searchResult]);

  return (
    <main>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item md={12} container>
          <Grid item md={12} maxWidth="md" className={classes.searchBg}>
            <SearchBar />
          </Grid>
          <Grid
            item
            md={12}
            maxWidth="md"
            direction="row"
            justify="center"
            alignItems="center"
          >
            {isLoading && <CircularProgress />}
            <Paper className={classes.root}>
              <List>
                {!isLoading &&
                  searchResult.length > 0 &&
                  searchResult.map((item) => <DoctorListItem doctor={item} />)}
              </List>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </main>
  );
}
