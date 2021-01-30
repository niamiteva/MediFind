import React, { useState, useEffect } from 'react';
//import DeleteUser from './DeleteUser'
import auth from '../../api/auth';
import {getUserById} from '../../api/users';
import {Redirect, Link} from 'react-router-dom';
import PatientProfile from './patients/PatientProfile'

export default function Profile(props) {
  const theUserId = props.match.params.userId;
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    getUserById({
      userId: theUserId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        setUser(data)
      }
    })

    return function cleanup(){
      abortController.abort()
    }

  }, [theUserId])
  
  if (redirectToSignin) {
    return <Redirect to='/login'/>
  }

  return (
    <main>
        <PatientProfile user={user}/>
    </main>
      
  )
}