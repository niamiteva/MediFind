import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import AccountBox from "@material-ui/icons/AccountBox";
import auth from "../../../../api/auth";
import {updateUser} from "../../../../api/users";
import {getAllSpecialties} from "../../../../api/specialties";

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
  select: {
    width: "100%",
  },
}));

export default function DoctorPersonalDetails(props) {
  const classes = useStyles();
  console.log(props);
  const { doctor } = props;
  const jwt = auth.isAuthenticated();
  const canEdit = !(
    auth.isAuthenticated().user &&
    auth.isAuthenticated().user.id === doctor.id
  );
  const [isEdited, setIsEdited] = useState(false);
  const [specialties, setSpecialties] = useState([])
  //const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [values, setValues] = useState({
    firstName: doctor.firstName,
    lastName: doctor.lastName,
    personalNumber: doctor.personalNumber,
    doctorUIN: doctor.doctorUIN,
    specialtyName: doctor.specialtyName,
    specialtyId: doctor.specialtyId,
    password: doctor.password,
    email: doctor.email,
    error: "",
  });

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    getAllSpecialties(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setSpecialties(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }
  }, [])

  const clickSubmit = () => {
    const editedDoctor = {
      firstName: values.firstName,
      lastName: values.lastName,
      personalNumber: values.personalNumber,
      specialtyName: specialties.find(x => x.id === values.specialtyId).name,
      specialtyId: values.specialtyId,
      email: values.email,
      password: values.password,
    };

    updateUser({ userId: doctor.id }, { t: jwt.token }, editedDoctor)
    .then((data) => {
        console.log(data);
        if (data && data.error) {
          setValues({ ...values, error: data.error });
          //setRedirectToSignin(true);
        } else {
          setValues({...values, error: ""});
          setIsEdited(false);
        }
      }
    );
  };

  const clickDiscard = () => {
    values.firstName = doctor.firstName;
    values.lastName = doctor.lastName;
    values.personalNumber = doctor.personalNumber;
    values.specialtyName = doctor.specialtyName;
    values.specialtyId = doctor.specialtyId;
    values.password = doctor.password;
    values.email = doctor.email;
    setValues({
      ...values,
    });
    setIsEdited(false);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    setIsEdited(true);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item container md={12}>
            <Grid item md={3}>
              <AccountBox style={{ fontSize: 200, color: "grey" }} />
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                style={{ marginLeft: 19 }}
              >
                Change picture
              </Button>
            </Grid>
            <Grid item md={8}>
              <TextField
                id="firstName"
                label="Име"
                className={classes.textField}
                value={values.firstName}
                onChange={handleChange("firstName")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit,
                }}
              />
              <br />
              <TextField
                id="lastName"
                label="Фамилия"
                className={classes.textField}
                value={values.lastName}
                onChange={handleChange("lastName")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit,
                }}
              />
              <br />
              <TextField
                id="email"
                type="email"
                label="Email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange("email")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit,
                }}
              />
              <br />
              <TextField
                id="password"
                type="password"
                label="Password"
                className={classes.textField}
                defaultValue={values.password}
                onChange={handleChange("password")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit,
                }}
              />
              <TextField
                id="personalNumber"
                label="ЕГН/ЛЧН/ЛН/СЛН"
                className={classes.textField}
                value={values.personalNumber}
                onChange={handleChange("personalNumber")}
                margin="normal"
                InputProps={{
                  readOnly: canEdit,
                }}
              />
              <br />
              <TextField
                id="doctorUIN"
                label="УИН"
                className={classes.textField}
                value={values.doctorUIN}
                onChange={handleChange("doctorUIN")}
                margin="normal"
                InputProps={{
                  readOnly: false,
                }}
              />
              <br />
              <FormControl className={classes.textField}>
                <InputLabel id="lspecialty" className={classes.select}>
                  Специалист
                </InputLabel>
                <Select
                  id="specialty"
                  labelId="lspecialty"
                  className={classes.select}
                  value={values.specialtyId}
                  onChange={handleChange("specialtyId")}
                >
                  {specialties.length > 0 && specialties.map((specialty) => (
                    <MenuItem value={specialty.id}>{specialty.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <br /><br />
            </Grid>
          </Grid>
          <Grid item container md={12}>
            <Grid item xs={8} />
            <Grid item xs={4}>
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                disabled={!isEdited}
                onClick={clickSubmit}
                style={{ marginRight: 10 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                onClick={clickDiscard}
                disabled={!isEdited}
              >
                Discard
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
