import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardContent, Card, IconButton ,Divider} from "@material-ui/core";
import {TextField,InputAdornment } from "@material-ui/core";
import { AddCircle, Edit} from "@material-ui/icons";
import RemedyList from "../RemedyList/RemedyList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}));

export default function RemedyListsEditor(props) { 
  const classes = useStyles();
  const {lists, userId, jwt} = props;
  const [values, setValues] = useState({
    lists: lists || [],
    error:""
  });

  const addBlankList = () => {
    const blankList = {
      listName: ""
    }
    const oldLists = values.lists;
    let newLists = [];
    if(oldLists.length > 0){
      oldLists.push(blankList); 
      newLists = oldLists;
    }
    else{
      newLists = [blankList];
    }
    values.lists = newLists;
    setValues({...values, error: ""});
  };

  return (
    <Grid container>
    {values.lists.lenght > 0 && values.lists.map((item) => {
      <RemedyList list={item} jwt={jwt} userId={userId} />
    })}
    <Grid item xs={2} spacing={3}>
      <Card>
        <CardContent>
          <TextField
            id="listName"
            label="Име"
            className={classes.textField}
            value={values.listName}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Edit />
                </InputAdornment>
              ),
            }}
          />
          <Divider />
          asd
        </CardContent>
      </Card>
    </Grid>
    <Card>
      <CardContent>
        <IconButton onClick={addBlankList}>
          <AddCircle style={{ fontSize: 80, color: "grey" }} />
        </IconButton>
      </CardContent>
    </Card>
    </Grid>
  );
}
