import React, { useState, useEffect} from "react";
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
  const [isBlankList, setIsBlankList] = useState(false);
  const [values, setValues] = useState({
    lists: lists || [],
    error:""
  });

  useEffect(() => {
    if(isBlankList){
      const blankList = {
        listName: "", 
        userId: userId
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
      setIsBlankList(false);
      setValues({...values, error: ""});
    }
  }, [isBlankList])

  const addBlankList = () => {
    setIsBlankList(true);
  };

  return (
    <Grid container spacing={3}>
    {values.lists.length > 0 && values.lists.map((item) => (
      <RemedyList list={item} jwt={jwt} userId={userId} />
    ))}
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
