import { useState, useEffect } from "react";
import queryString from "query-string";
import LoadingSpinner from "react-loader-spinner";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {Card, CardActionArea, CardContent, CardMedia,} from "@material-ui/core";
import {Grid,Typography,Button} from "@material-ui/core";
import { search } from "../../api/search";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    minWidth: "99%",
    minHeight: 200,
    margin: 5,
  },
  cardDetails: {
    flex: 1,
    width: "100%",
  },
  cardMedia: {
    flex: 1,
    width: "100%",
    height: "80%",
    marginLeft: 10,
    marginTop: 10,
  },
  detailsButton: {
    marginBottom: theme.spacing(2),
    width: "100%",
    background: "#F44336",
    color: "#fff",
  },
  buyButton: {
    marginBottom: theme.spacing(2),
    width: "100%",
    background: "#B0BEC5",
    color: "#fff",
  },
}));

export default function RemedyItemCard(props) {
  const classes = useStyles();

  return (
    <Grid item xs={6} spacing={6}>
      <CardActionArea component="a" href={props.itemUrl}>
        <Card className={classes.card}>
          <Grid container spacing={1}>
            <Grid item xs justify="center">
              <CardMedia className={classes.cardMedia} image={props.imgUrl} />
            </Grid>
            <Grid item xs={5}>
              <CardContent className={classes.cardDetails}>
                <Typography component="h6" variant="h6">
                  {props.remedy}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" >
                  {props.price}
                </Typography>
                {/* <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography> */}
                <Typography variant="subtitle1" color="primary">
                  Sopharmacy
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs>
              <CardContent>
                <Button className={classes.detailsButton}>Листовка</Button>
                <Button className={classes.buyButton}>Купи</Button>
                <Button className={classes.buyButton}>Добави в списък</Button>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
