import React from "react";
import {verify} from "../../api/verify";
import { Link } from "react-router-dom";
import {Button} from '@material-ui/core';

export default function Verify(props) {
  verify(props);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <Link to={"/login"}>
        <Button color="secondary" variant="contained">Log In</Button>
      </Link>
    </div>
  );
};