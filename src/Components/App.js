import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import LoginDialog from './LoginDialog'
import { handleInitialData } from './store/actions/shared'

import Navbar from './layouts/Navbar'
import PrivateRoute from './utils/PrivateRoute'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authUser } = this.props
    return (
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          <Navbar />
          <Route path="/login" component={LoginDialog} />
          <PrivateRoute authUser={authUser} path="/private" component={(props) => <h1>Private stuff</h1>} />
          {/* <Route path="/private" component={() => <h1>Here2</h1>} /> */}
          {/* <Route path="/private" render={(props) => (<h1>Here3</h1>)} /> */}
          <Link to='/private'>Private Link</Link>
        </Fragment>
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
