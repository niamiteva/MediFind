import React, { useState, useEffect } from 'react';
//import DeleteUser from './DeleteUser'
import {CircularProgress } from "@material-ui/core";
import auth from '../../api/auth';
import {getUserById} from '../../api/users';
import {Redirect, Link} from 'react-router-dom';
import PatientProfile from './patients/PatientProfile'

export default function Profile(props) {
  const theUserId = props.match.params.userId;
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setLoading(true);

    // if (user) {
    //   setLoading(false);
    //   abortController.abort();
    //   return;
    // }

    getUserById({userId: theUserId}, {t: jwt.token}, signal)
    .then((data) => {
      console.log(data);
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })
    .catch((err) => console.error(err))
    .finally(() => {
      setLoading(false);
    });

    return function cleanup(){
      abortController.abort()
    }

  }, [theUserId])
  
  if (redirectToSignin) {
    return <Redirect to='/login'/>
  }

  return (
    <main>
       {isLoading && <CircularProgress  />}
       {!isLoading && user && (
        <PatientProfile user={user}/>
       )}
    </main>
      
  )
}