import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import { AccountBox } from "@material-ui/icons";
import PatientPersonalDetails from "./PatientPersonalDetails/PatientPersonalDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    width: '100%',
    display: 'flex'
  },
  tabPanel: {
    width: '80%',
  },
  tabs: {
    borderRight: "1px solid #F44336",
    width: "20%",
  },
  icon: {
    paddingRight: 10,   
  },
  labelContainer: {
    width: "auto",
  },
  iconLabelWrapper: {
    flexDirection: "row",
  },
}));

export default function PatientProfile(props) {
  const classes = useStyles();
  const { user } = props;
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical profile tabs"
          className={classes.tabs}
        >
          <Tab
            classes={{
              wrapper: classes.iconLabelWrapper,
              labelContainer: classes.labelContainer
            }}
            label="Лични данни"
            value="1"
            icon={<AccountBox color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Tab label="Item Two" value="2" />
          <Tab label="Item Three" value="3" />
        </Tabs>
        <TabPanel value="1" className={classes.tabPanel}>
          <PatientPersonalDetails user={user} />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
}
