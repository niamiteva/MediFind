import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    minWidth: "99%",
    minHeight: 200,
    margin: 5,
  },
  cardDetails: {
    flex: 1,
    width: "100%",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(3)
  },
  detailsButton: {
    marginBottom: theme.spacing(2),
    width: "100%",
    background: "#F44336",
    color: "#fff",
  },
  buyButton: {
    marginBottom: theme.spacing(2),
    width: "100%",
    background: "#B0BEC5",
    color: "#fff",
  },
}));

export default function PatientListItem(props) {
  const classes = useStyles();
  const { user } = props;
  debugger;
  const goToProfilePage = () => {};

  return (
    <ListItem onClick={goToProfilePage()}>
      <ListItemAvatar>
        <Avatar alt="Profile" src="" className={classes.avatar}>
          <Person style={{ fontSize: 60 }}/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.firstName + " " + user.lastName}
        secondary={user.personalNumber + ", "+ user.email}
      />
      <Divider />
    </ListItem>
  );
}
