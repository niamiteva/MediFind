import React, { useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import { AddCircle} from "@material-ui/icons";
import RemedyList from "../RemedyList/RemedyList";
import { createList } from "../../../../../api/remedyLists";

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
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState({
    lists: lists || [],
    error:""
  });

  const addBlankList = () => {
    //setIsBlankList(true);
    const newList = {
      listName: "New list", 
      userId: userId
    }
    const oldLists = values.lists;
    setLoading(true);
    createList({ t: jwt.token }, newList)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          let newLists = [];
          if(oldLists.length > 0){
            oldLists.push(data); 
            newLists = oldLists;
          }
          else{
            newLists = [data];
          }
          values.lists = newLists;
          //setIsBlankList(false);
          setValues({...values, error: ""});
          setLoading(false);
        }
      });
  };

  return (
    <Grid container spacing={3}>
      {!isLoading && values.lists.length > 0 && values.lists.map((item) => (
        <RemedyList list={item} jwt={jwt} userId={userId} />
      ))}
       <Grid item md={2}>
            <IconButton onClick={addBlankList} size="small">
              <AddCircle color="secondary" style={{ fontSize: 80}} />
            </IconButton>
      </Grid>
    </Grid>
  );
}
