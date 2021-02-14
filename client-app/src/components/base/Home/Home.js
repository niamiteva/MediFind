import React from 'react';
import auth from '../../../api/auth';
import GuestUserContent from './HomeContents/GuestUserContent';
import AuthenticatedUserContent from './HomeContents/AuthenticatedUserContent';

export default function Home(){
  return (
    <main>
      {!auth.isAuthenticated() && (<GuestUserContent/>)}
      {auth.isAuthenticated() && (<AuthenticatedUserContent/>)}
    </main>
  )
}