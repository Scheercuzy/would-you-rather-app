import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'

import LoginDialog from './LoginDialog'
import { handleInitialData } from './store/actions/shared'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import CreatePoll from './CreatePoll'

import Layout from './layouts/index'
import PrivateRoute from './utils/PrivateRoute'

import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})



class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authUser, classes } = this.props
    return (
      <BrowserRouter>
        <Layout>
          <CssBaseline />
          <Paper className={classes.root} >
          <Route path="/login" component={LoginDialog} />
          <PrivateRoute exact path="/" authUser={authUser} component={Home} />
          <PrivateRoute path="/leaderboard" authUser={authUser} component={LeaderBoard} />
          <PrivateRoute path="/createpoll" authUser={authUser} component={CreatePoll} />
          </Paper>
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

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(App)
