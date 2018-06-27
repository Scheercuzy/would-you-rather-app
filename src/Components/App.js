import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import LoginDialog from './LoginDialog'
import { handleInitialData } from './store/actions/shared'

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
          <PrivateRoute authUser={authUser} path="/private" component={(props) => <h1>Private stuff</h1>} />
          <Link to='/private'>Private Link</Link>
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
