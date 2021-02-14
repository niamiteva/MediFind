import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {CircularProgress } from "@material-ui/core";
import { Grid} from "@material-ui/core";
import { getRemedyListsByUserId} from "../../../../api/remedyLists";
import auth from '../../../../api/auth';
import RemedyListsEditor from "./RemedyListsEditor/RemedyListsEditor"; 

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}));

export default function RemedyLists(props) {
  const classes = useStyles();
  console.log(props);
  const jwt = auth.isAuthenticated();
  const userId = props.user.id || jwt.user.id;
  const [isLoading, setLoading] = useState(true);
  const [lists, setLists] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    // if (lists) {
    //   setLoading(false);
    //   abortController.abort();
    //   return;
    // }

    getRemedyListsByUserId({ userId: userId },{ t: jwt.token }, signal)
    .then((data) => {
      if(!data){
        return;
      }
      else if (data && data.error) {
        console.error(data.error); //TODO handle errors
      } else {
        setLists(data);
      }
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setLoading(false);
    });

    return function cleanup() {
      abortController.abort();
    };

  }, [userId]);

  return (
    <Grid container className={classes.root}>
      <Grid item md={12} container>
        {isLoading && <CircularProgress  />}
        {!isLoading && (
          <RemedyListsEditor lists={lists} userId={userId} jwt={jwt}/>
        )}
      </Grid>
    </Grid>
  );
}
