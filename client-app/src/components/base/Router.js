import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import RemedyResult from '../remedy/RemedyResults'
import Users from '../user/Users';
import SignUp from '../user/SignUp';
import LogIn from '../user/LogIn';
import Profile from '../user/Profile';
//import PrivateRoute from './auth/PrivateRoute'
import Menu from './Menu';

class MainRouter extends Component {
  state = {
    home: Home,
    users: Users,
    signup: SignUp,
    login: LogIn,
    remedy: RemedyResult,
    profile: Profile
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
        <Route path="/user/:userId" component={this.state.profile}/>
      </Switch>
    </div>)
  }
}

export default MainRouter
