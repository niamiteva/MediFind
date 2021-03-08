import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, List, CircularProgress } from "@material-ui/core";
//import DeleteUser from './DeleteUser'
import DoctorListItem from '../../../search/doctors/doctorListItem/DoctorListItem'
import auth from "../../../../api/auth";
import { getPatientsDoctors } from "../../../../api/users";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "85%",
  },
}));

export default function MyDoctors(props) {
  const classes = useStyles();
  console.log(props);
  const { user } = props;
  const jwt = auth.isAuthenticated();
  const [isLoading, setLoading] = useState({});
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setLoading(true);
    
    getPatientsDoctors({userId: user.id}, {t: jwt.token}, signal)
    .then((data) => {
      console.log(data);
      if (data && data.error) {

      } else {
        setDoctors(data.doctors)
      }
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setLoading(false);
    });

    return function cleanup(){
      abortController.abort()
    }

  }, [user.id])

  return (
    <Card className={classes.root}>
      <CardContent>
        <List>
          {isLoading && <CircularProgress />}
          {!isLoading &&
            doctors.length > 0 &&
            doctors.map((item) => <DoctorListItem doctor={item} />)}
        </List>
      </CardContent>
    </Card>
  );
}
