import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Divider } from "@material-ui/core";
import { TabPanel, TabContext, TabList } from "@material-ui/lab";
import { AccountBox, Event, List,ListAlt, Assignment,AssignmentTurnedIn, Contacts } from "@material-ui/icons";
import PatientPersonalDetails from "./PatientPersonalDetails/PatientPersonalDetails";
import RemedyLists from "./RemedyLists/RemedyLists";
import MyDoctors from "./MyDoctros/MyDoctors";
import ScheduleCalendar from '../scheduleCalendar/Calendar'

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
  const { user} = props;
  const [tab, setTab] = useState("1");

  const handleChange = (event,newValue) => {
    setTab(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={tab}>
        <TabList
          orientation="vertical"
          variant="scrollable"
          value={tab}
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
            label="Моите лекари"
            value="6"
            icon={<Contacts color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            label="Календар"
            value="7"
            icon={<Event color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
        </TabList>
        <TabPanel value="1" className={classes.tabPanel}>
          <PatientPersonalDetails user={user} />
        </TabPanel>
        <TabPanel value="2" className={classes.tabPanel}>
          <RemedyLists user={user}/>
        </TabPanel>
        <TabPanel value="6" className={classes.tabPanel}>
          <MyDoctors user={user}/>
        </TabPanel>
        <TabPanel value="7" className={classes.tabPanel}>
          <ScheduleCalendar/>
        </TabPanel>
      </TabContext>
    </div>
  );
}
