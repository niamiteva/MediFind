import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Spa } from "@material-ui/icons";
import { searchRemedy } from "../../../../../../api/search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
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
  const classes = useStyles();
  const { remedyName, setValues } = props;
  const [remedies, setRemedies] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(true);

    searchRemedy({ q: values.remedyName},  signal)
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
  }, [values.remedyName]);

  const selectRemedyForTheList = (remedy, price) => {
    setValues({ remedyName:remedy, price: price , error: "" });
  }

  return (
    <Card>
      <List>
        {!isLoading && remedies.length > 0 && remedies.map(item => (
          <ListItem onClick={selectRemedyForTheList(item.itemName, item.price)}>
            <ListItemAvatar className={classes.avatar}>
              <Avatar alt="Remedy" >
                <Spa />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.itemName} secondary={item.price}/>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
