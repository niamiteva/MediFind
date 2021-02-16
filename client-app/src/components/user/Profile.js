import React, { useState, useEffect } from 'react';
import {CircularProgress } from "@material-ui/core";
import auth from '../../api/auth';
import {getUserById} from '../../api/users';
import {Redirect} from 'react-router-dom';
import PatientProfile from './patients/PatientProfile';
import DoctorProfile from './doctors/DoctorProfile';

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
       {!isLoading && user && user.type === "Patient" && (
        <PatientProfile user={user}/>
       )}
       {!isLoading && user && user.type === "Doctor" && (
        <DoctorProfile doctor={user}/>
       )}
    </main>
      
  )
}