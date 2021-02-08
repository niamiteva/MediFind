import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CardContent, Card } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}));

export default function RemedyLists(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
        <Grid item md={12} container>
          <Grid container>
            {/* {!isLoading && searchResult.map((item) => (
               <RemedyItemCard remedy={item.itemName} imgUrl={item.imgSrc} price={item.price} itemUrl={item.itemUrl}/>
            ))} */}
            <Card>
              <CardContent>
                <AddCircle style={{ fontSize: 80, color: 'grey' }}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
  );
}