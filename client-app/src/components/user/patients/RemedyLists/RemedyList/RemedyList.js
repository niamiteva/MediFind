import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardContent, Card, Divider } from "@material-ui/core";
import { InputAdornment, TextField , IconButton} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { editList } from "../../../../../api/remedyLists";

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
  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState({
    listName: list.listName || "",
    listId: list.listId || "",
    error: "",
  });

  const editOrCreateList = (listId) => {
    //set timeout
    debugger;
    const editedList = {
      listName: values.listName,
      userId: userId,
    };

    if (list && list.id) {
      console.log("edit list");
      editList({ listId: listId }, { t: jwt.token }, editedList)
      .then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "" });
        }
      });
    }
  };

  const enableEdit = () =>{
    setEditMode(true);
  }

  const handleChangeAndUpdate = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    editOrCreateList();
  };

  return (
    <Grid item md={3}>
      <Card>
        <CardContent>
          <TextField
            id={values.listId}
            className={classes.textField}
            defaultValue={values.listName}
            onChange={handleChangeAndUpdate("listName")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={enableEdit} size="small">
                    <Edit color="primary" style={{ fontSize: 18}}/>
                  </IconButton>    
                  <IconButton  size="small">
                    <Delete color="secondary" style={{ fontSize: 18}}/>
                  </IconButton>             
                </InputAdornment>
              ),
              readOnly: !editMode
            }}
          />
          <Divider />
        </CardContent>
      </Card>
    </Grid>
  );
}
