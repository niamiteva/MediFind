import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { Spa, AddCircle } from "@material-ui/icons";
import { Grid, TextField, IconButton, Divider , CircularProgress, ListSubheader} from "@material-ui/core";
import {getRemediesByListId, createRemedy, editRemedy} from '../../../../../../api/remedy';
import RemedySearchList from './RemedySearchList'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    maxHeight: 300,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: -15
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%",
  },
}));

export default function Remedies(props) {
  debugger;
  const classes = useStyles();
  const { editMode, listId, jwt } = props;
  const [remedies, setRemedies] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [values, setValues] = useState({
    remedyName: "",
    price: "",
    remedyLink: "",
    error: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    getRemediesByListId({ listId: listId }, { t: jwt.token }, signal)
      .then((data) => {
        if (!data) {
          return;
        } else if (data && data.error) {
          console.error(data.error); //TODO handle errors
        } else {
          setRemedies(data); 
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });

    return function cleanup() {
      abortController.abort();
    };
  }, [listId]);

  const editTheRemedy = (remedy) => {
    //set timeout
    setSearch(false);
    setLoading(true);
    const editedRemedy = {
      checked: remedy.checked
    };

      editRemedy({ remedyId: remedy.id }, { t: jwt.token }, editedRemedy)
      .then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "" });
          
        }
        setLoading(false);
      });
  };

  const handleToggle = (value) => () => {
    const remedy = remedies.find((x) => x.id === value);
    remedy.checked = !remedy.checked;
    setRemedies(remedies);
    editTheRemedy(remedy);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    //todo: set input timeout
    setSearch(true);
  };

  const addListItem = () => {
    const oldList = remedies;
    setLoading(true);
    const newRemedy ={
      remedyName: values.remedyName,
      listId: listId
    };
    createRemedy({ t: jwt.token }, newRemedy)
    .then((data) =>{
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        let newList = [];
        if(oldList.length > 0){
          oldList.push(data); 
          newList = oldList;
        }
        else{
          newList = [data];
        }
        setRemedies(newList);
        setValues({...values, error: ""});
        setLoading(false);
        setSearch(false);
      }
    })
  };

  return (
    <div>
    <List dense className={classes.root}>
      {isLoading && <CircularProgress />}
      {!isLoading && 
        remedies.length &&
        remedies.length > 0 &&
        remedies.map((remedy) => {
          return (
            <ListItem key={remedy.id} button>
              <ListItemAvatar className={classes.avatar}>
                <Avatar alt="Remedy" >
                  <Spa />
                </Avatar>
              </ListItemAvatar>
              <ListItemText id={remedy.id} secondary={remedy.remedyName} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(remedy.id)}
                  checked={remedy.checked}
                  inputProps={{ "aria-labelledby": remedy.remedyName }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      {!isLoading && editMode && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <TextField
              id="newRemedy"
              className={classes.textField}
              value={values.remedyName}
              onChange={handleChange("remedyName")}
              margin="normal"
            />
            <br />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={addListItem} size="small">
              <AddCircle color="secondary" style={{ fontSize: 20 }} />
            </IconButton>
          </Grid>
        </Grid>
      )}
      {search && (
        <RemedySearchList q={values.remedyName} setRemedyName={setValues} />
      )}   
      </List>
      <Divider/> 
      <List>   
      {!isLoading && remedies.length && remedies.length>0 && (    

          <ListSubheader> 
          {"total: " + remedies.reduce(
            (a, b)=> {
              return a + (b.price || 0);
            }, 0)} 
          </ListSubheader>
          
       
      )}
      </List>
      </div>
    
  );
}
