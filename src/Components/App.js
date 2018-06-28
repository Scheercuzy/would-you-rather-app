import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'

import LoginDialog from './LoginDialog'
import { handleInitialData } from './store/actions/shared'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import CreatePoll from './CreatePoll'

import Layout from './layouts/index'
import PrivateRoute from './utils/PrivateRoute'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authUser } = this.props
    return (
      <BrowserRouter>
        <Layout>
          <CssBaseline />
          <Route path="/login" component={LoginDialog} />
          <PrivateRoute exact path="/" authUser={authUser} component={Home} />
          <PrivateRoute path="/leaderboard" authUser={authUser} component={LeaderBoard} />
          <PrivateRoute path="/createpoll" authUser={authUser} component={CreatePoll} />
        </Layout>
      </BrowserRouter>
      )
  }
}

function mapStateToProps({ authUser }) {
  return {
      authUser
  }
}

export default connect(mapStateToProps)(App)
