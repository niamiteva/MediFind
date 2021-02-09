import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardContent, Card, IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { getRemedyListsByUserId } from "../../../../api/remedyLists";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}));

export default function RemedyLists(props) {
  const classes = useStyles();
  const userId = props.id;
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [isBlankList, setIsBlankList] = useState(false);
  const jwt = auth.isAuthenticated();
  const [values, setValues] = useState({
    listName: "",
    items: {},
  });
  const [lists, setLists] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    getRemedyListsByUserId(
      {
        userId: userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setLists(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) {
    return <Redirect to="/login" />;
  }

  const addBlankList = () => {
    setIsBlankList(true);
    lists.add({
      listName: "",
      items: {},
    });
  };

  const handleChangeAndUpdate = (name) => (event) => {
    setIsBlankList(false);
    setValues({ ...values, [name]: event.target.value });
    //updateList
  };

  return (
    <Grid container className={classes.root}>
      <Grid item md={12} container>
        <Grid container>
          {lists.lenght > 0 && list.map((item) => {
            //<RemedyList></RemedyList>
          })}
          {isBlankList && (
            <Card>
              <CardContent>
                <TextField
                  id="listName"
                  label="Име"
                  className={classes.textField}
                  value={values.listName}
                  onChange={handleChangeAndUpdate("listName")}
                  margin="normal"
                />
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent>
              <IconButton onClick={addBlankList()}>
                <AddCircle style={{ fontSize: 80, color: "grey" }} />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
