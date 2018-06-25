import React, { Component, Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './layouts/Navbar'

class App extends Component {
  render() {
    return (
    <Fragment>
      <CssBaseline />
      <Navbar />
    </Fragment>
    )
  }
}

export default App
