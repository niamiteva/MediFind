import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, List, CircularProgress } from "@material-ui/core";
//import DeleteUser from './DeleteUser'
import PatientListItem from './PatientListItem'
import auth from "../../../../api/auth";
import { getDoctorsPatients } from "../../../../api/doctors";

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
  const { doctor } = props;
  const jwt = auth.isAuthenticated();
  const [isLoading, setLoading] = useState({});
  const [patients, setPatients] = useState({});

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setLoading(true);
    debugger;
    getDoctorsPatients({doctorId: doctor.id}, {t: jwt.token}, signal)
    .then((data) => {
      console.log(data);
      if (data && data.error) {
        //setRedirectToSignin(true)
      } else {
        setPatients(data.users)
      }
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setLoading(false);
    });

    return function cleanup(){
      abortController.abort()
    }

  }, [doctor.id])

  return (
    <Card className={classes.root}>
      <CardContent>
        <List>
          {isLoading && <CircularProgress />}
          {!isLoading &&
            patients.length > 0 &&
            patients.map((item) => <PatientListItem user={item} />)}
        </List>
      </CardContent>
    </Card>
  );
}
