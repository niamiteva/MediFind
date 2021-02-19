import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Divider,Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '75%',
    padding: theme.spacing(5)
  },
  title: {
    marginTop: theme.spacing(2),
  }
}));

export default function SiteInfoCard(){
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography gutterBottom variant="h5" component="h2">
        Какво представлява MediFind?
      </Typography>
      <Divider/>
      <Typography variant="body2" color="textSecondary" component="p" className={classes.title}>
        MediFind е платформа за търсене на лекарства и проверка за наличието им по аптеките. Търсачка за специалисти и връзка с тях. Предоставя и издаване на електронни рецепти и направления. Въсможност да събирате всичко с вързано с ваши лечения на едно място и лекуващите ви лекари да проследят лечениято и да проверят за предишни такива.
      </Typography>
    </Paper>
  )
}  