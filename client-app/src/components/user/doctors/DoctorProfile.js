import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Divider } from "@material-ui/core";
import { TabPanel, TabContext, TabList } from "@material-ui/lab";
import { AccountBox, Event, RecentActors, ImportContacts, PostAdd } from "@material-ui/icons";
import DoctorPersonalDetails from './DoctorPersonalDetails/DoctorPersonalDetails';
import MyPatients from './MyPatients/MyPatients';
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

export default function DoctorProfile(props) {
  const classes = useStyles();
  const { doctor} = props;
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
            disabled
            label="Биография"
            value="2"
            icon={<ImportContacts color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            disabled
            label="Публикации"
            value="3"
            icon={<PostAdd color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            label="Пациенти"
            value="4"
            icon={<RecentActors color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
          <Tab
            label="Календар"
            value="5"
            icon={<Event color="primary" fontSize='large' className={classes.icon}/>}
          />
          <Divider/>
        </TabList>
        <TabPanel value="1" className={classes.tabPanel}>
          <DoctorPersonalDetails doctor={doctor} />
        </TabPanel>
        <TabPanel value="4" className={classes.tabPanel}>
          <MyPatients doctor={doctor} />
        </TabPanel>
        <TabPanel value="5" className={classes.tabPanel}>
          <ScheduleCalendar/>
        </TabPanel>
      </TabContext>
    </div> 
  );
}
