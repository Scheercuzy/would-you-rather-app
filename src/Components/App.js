import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import LoginDialog from './LoginDialog'
import { handleInitialData } from './store/actions/shared'

import Navbar from './layouts/Navbar'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          <Navbar />
          <Route path="/login" component={LoginDialog} />
        </Fragment>
      </BrowserRouter>
      )
  }
}

function mapStateToProps({ authUser, users }) {
  return {
      authUser,
      users
  }
}

export default connect(mapStateToProps)(App)
