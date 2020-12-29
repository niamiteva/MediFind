import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Users from '../user/Users'
import Signup from '../user/SignUp'
import Login from '../user/LogIn'
import EditProfile from '../user/EditProfile'
import Profile from '../user/Profile'
//import PrivateRoute from './auth/PrivateRoute'
import Menu from './Menu'

const MainRouter = () => {
    return (<div>
      <Menu/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        {/* <PrivateRoute path="/user/edit/:userId" component={EditProfile}/> */}
        <Route path="/user/:userId" component={Profile}/>
      </Switch>
    </div>)
}

export default MainRouter
