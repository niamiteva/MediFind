import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import RemedyResult from '../search/remedy/RemedyResults';
import DoctorsResult from '../search/doctors/DoctorsResults';
import Users from '../user/Users';
import SignUp from '../user/SignUp';
import LogIn from '../user/LogIn';
import Profile from '../user/Profile';
//import PrivateRoute from './auth/PrivateRoute'
import Menu from './Menu';
import Verify from '../user/Verify';

class MainRouter extends Component {
  state = {
    home: Home,
    users: Users,
    signup: SignUp,
    login: LogIn,
    remedy: RemedyResult,
    doctors: DoctorsResult,
    profile: Profile,
    verify: Verify
  }

  render() {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={this.state.home}/>
        <Route path="/users" component={this.state.users}/>
        <Route path="/signup" component={this.state.signup}/>
        <Route path="/login" component={this.state.login}/>
        <Route path="/search/remedy" component={this.state.remedy}/>
        <Route path="/search/doctors" component={this.state.doctors}/>
        <Route path="/user/:userId" component={this.state.profile}/>      
        <Route path="/verification" component={this.state.verify} />
      </Switch>
    </div>)
  }
}

export default MainRouter
