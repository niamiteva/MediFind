import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import SearchResult from '../items/SearchResults'
import Users from '../user/Users';
import SignUp from '../user/SignUp';
import LogIn from '../user/LogIn';
import EditProfile from '../user/EditProfile'
import Profile from '../user/Profile';
//import PrivateRoute from './auth/PrivateRoute'
import Menu from './Menu';

class MainRouter extends Component {
  state = {
    home: Home,
    users: Users,
    signup: SignUp,
    login: LogIn,
    search: SearchResult
  }

  render() {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={this.state.home}/>
        <Route path="/users" component={this.state.users}/>
        <Route path="/signup" component={this.state.signup}/>
        <Route path="/login" component={this.state.login}/>
        <Route exact path="/search/remedy" component={this.state.search}/>
        {/* <PrivateRoute path="/user/edit/:userId" component={EditProfile}/> */}
        {/* <Route path="/user/:userId" component={Profile}/> */}
      </Switch>
    </div>)
  }
}

export default MainRouter
