import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs, Divider } from "@material-ui/core";
import { TabPanel, TabContext } from "@material-ui/lab";
import { AccountBox, Event, List,ListAlt, Assignment,AssignmentTurnedIn, Contacts } from "@material-ui/icons";
import PatientPersonalDetails from "./PatientPersonalDetails/PatientPersonalDetails";
import RemedyLists from "./RemedyLists/RemedyLists"

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
            label="Лични данни"
            value="1"
            icon={<AccountBox color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            label="Списъци с лекартсва"
            value="2"
            icon={<List color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            disabled
            label="Рецепти"
            value="3"
            icon={<ListAlt color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            disabled
            label="Амбулаорни листи и направления"
            value="4"
            icon={<Assignment color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            disabled
            label="Изследвания"
            value="5"
            icon={<AssignmentTurnedIn color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            disabled
            label="Моите лекари"
            value="6"
            icon={<Contacts color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            disabled
            label="Календар"
            value="7"
            icon={<Event color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
        </Tabs>
        <TabPanel value="1" className={classes.tabPanel}>
          <PatientPersonalDetails user={user} />
        </TabPanel>
        <TabPanel value="2" className={classes.tabPanel}>
          <RemedyLists/>
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
}
