import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import auth from "../../../../api/auth";
import { FormControl, Grid, IconButton, MenuItem, Select } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { TimePicker } from '@material-ui/pickers'


const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function DoctorWorktime(props) {
  const doctorId = props.doctorId;
  const worktime = props.worktime; //array
  const days = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"];
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState({
    worktimes: worktime || [],
    day: "",
    from: "",
    to: "",
    error: ""
  })

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addWorkTime = () => {
    setLoading(false);
    const newWorktime = values.worktimes.push({
      doctorId: doctorId,
      day: day,
      from: from,
      to: to,
    });
    setValues({...values, ["worktime"]: newWorktime});
    //Todo: createWorktime()
  }

  return (
    !isLoading && values.worktimes.length > 0 && values.worktimes.map((wt) => 
      <WortimeItem worktime={wt}/>
    ),
    !isLoading && (
      <Grid container>
        <Grid item md={4}>
          <FormControl>
            <InputLabel id="ldays" className={classes.select}>
              Ден
            </InputLabel>
              <Select
                id="days"
                labelId="ldays"
                className={classes.select}
                value={values.day}
                onChange={handleChange("day")}
              >
                {days.length > 0 && days.map((day) => (
                  <MenuItem value={day}>{day}</MenuItem>
                ))}
              </Select>
          </FormControl>
        </Grid>
        <Grid item md={3}>
          <TimePicker
            clearable
            ampm={false}
            label="От"
            value={values.from}
            onChange={handleChange("from")}
          />
        </Grid>
        <Grid item md={3}>
        <TimePicker
            clearable
            ampm={false}
            label="До"
            value={values.to}
            onChange={handleDateChange("to")}
          />
        </Grid>
        <Grid item md={2}>
            <IconButton onClick={addWorkTime} size="small">
              <AddCircle color="secondary" style={{ fontSize: 80}} />
            </IconButton>
        </Grid>
      </Grid>
    )
  
  );
}