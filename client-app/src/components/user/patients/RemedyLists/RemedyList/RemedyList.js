import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardContent, Card, IconButton, Divider } from "@material-ui/core";
import { InputAdornment, TextField } from "@material-ui/core";
import { AddCircle, Edit } from "@material-ui/icons";
import { createList, editList } from "../../../../../api/remedyLists";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}));

export default function RemedyList(props) {
  const classes = useStyles();
  debugger;
  console.log(props);
  const { userId, jwt, list } = props;
  const [values, setValues] = useState({
    listName: list.listName || "",
    error: "",
  });

  const editOrCreateList = () => (listId) => {
    debugger;
    const newList = {
      listName: values.listName,
      userId: userId,
    };

    if (list) {
      editList({ listId: listId }, { t: jwt.token }, newList).then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "" });
        }
      });
    } else {
      createList({ t: jwt.token }, newList).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "" });
        }
      });
    }
  };

  const handleChangeAndUpdate = () => (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    editOrCreateList();
  };

  return (
    <Grid item md={2}>
      <Card>
        <CardContent>
          <TextField
            id="listName"
            className={classes.textField}
            value={values.listName}
            onChange={handleChangeAndUpdate("listName")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Edit />
                </InputAdornment>
              ),
            }}
          />
          <Divider />
        </CardContent>
      </Card>
    </Grid>
  );
}
